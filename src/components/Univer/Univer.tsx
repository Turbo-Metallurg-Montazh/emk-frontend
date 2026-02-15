import {type JSX, useEffect, useRef, useState} from "react";
import {
    createUniver,
    LocaleType,
    mergeLocales,
} from "@univerjs/presets";
import {UniverSheetsCorePreset} from "@univerjs/preset-sheets-core";
import UniverPresetSheetsCoreEnUS from "@univerjs/preset-sheets-core/locales/en-US";
import type { CellValue } from "@univerjs/core";

import "@univerjs/preset-sheets-core/lib/index.css";

type CreateUniverResult = ReturnType<typeof createUniver>;


const API_BASE = "http://localhost:8000";

type OptionPair = {
    label: string;
    a: CellValue;
    b: CellValue;
};


type SuggestResponse = {
    options: OptionPair[];
};


export default function Univer(): JSX.Element {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const univerAPIRef = useRef<CreateUniverResult["univerAPI"] | null>(null);
    const importInputRef = useRef<HTMLInputElement | null>(null);


    const [options, setOptions] = useState<OptionPair[]>([]);
    const [open, setOpen] = useState<boolean>(false);

    // ---------- Init Univer ----------
    useEffect(() => {
        if (!containerRef.current) return;

        const {univerAPI} = createUniver({
            locale: LocaleType.EN_US,
            locales: {
                [LocaleType.EN_US]: mergeLocales(UniverPresetSheetsCoreEnUS),
            },
            presets: [
                UniverSheetsCorePreset({
                    container: containerRef.current,
                }),
            ],
        });

        univerAPI.createWorkbook({name: "Demo"});
        univerAPIRef.current = univerAPI;

        const onKeyDown = (e: KeyboardEvent) => {
            if (e.ctrlKey && e.key.toLowerCase() === "j") {
                e.preventDefault();
                runSuggest();
            }
            if (e.key === "Escape") {
                setOpen(false);
            }
        };

        window.addEventListener("keydown", onKeyDown);

        return () => {
            window.removeEventListener("keydown", onKeyDown);
            univerAPI.dispose();
        };
    }, []);

    // ---------- Helpers ----------
    function getActiveCell(): { r: number; c: number } | null {
        const api = univerAPIRef.current;
        const wb = api?.getActiveWorkbook();
        const sheet = wb?.getActiveSheet();
        const sel = sheet?.getSelection();
        const cell = sel?.getCurrentCell();

        if (!cell) return null;

        return {
            r: cell.actualRow,
            c: cell.actualColumn,
        };
    }

    function getRowValues(rowIndex: number): unknown[] {
        const api = univerAPIRef.current;
        const wb = api?.getActiveWorkbook();
        const sheet = wb?.getActiveSheet();
        if (!sheet) return [];

        const NUM_COLS = 20;
        const range = sheet.getRange(rowIndex, 0, 1, NUM_COLS);
        const values = range.getValues();

        return values?.[0] ?? [];
    }

    async function runSuggest(): Promise<void> {
        const cell = getActiveCell();
        if (!cell) return;

        setOpen(true);

        const rowValues = getRowValues(cell.r);

        const res = await fetch(`${API_BASE}/suggest`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                row: rowValues,
                rowIndex: cell.r,
                colIndex: cell.c,
            }),
        });

        if (!res.ok) {
            console.error(`Suggest error: ${res.status}`);
            setOpen(false);
            return;
        }

        const data = (await res.json()) as SuggestResponse;
        setOptions(data.options ?? []);
    }


    function applyOption(option: OptionPair): void {
        const api = univerAPIRef.current;
        const cell = getActiveCell();
        if (!api || !cell) return;

        const sheet = api.getActiveWorkbook()?.getActiveSheet();
        if (!sheet) return;

        // Write into selected cell + next cell
        sheet
            .getRange(cell.r, cell.c, 1, 2)
            .setValues([[option.a, option.b]]);

        setOpen(false);
    }

    async function importXlsx(file: File) {
        const fd = new FormData();
        fd.append("file", file);

        const res = await fetch(`${API_BASE}/import-xlsx`, {
            method: "POST",
            body: fd,
        });

        if (!res.ok) {
            console.error("Import failed");
            return;
        }

        const data = await res.json();
        const api = univerAPIRef.current;
        if (!api) return;

        // Create fresh workbook
        api.createWorkbook({ name: "Imported" });

        data.sheets.forEach((sheetData: any) => {
            const wb = api.createWorkbook({ name: sheetData.name });
            const sheet = wb.getActiveSheet();

            // 🔑 Determine required size
            let maxRow = 0;
            let maxCol = 0;

            sheetData.cells.forEach((c: any) => {
                if (c.r > maxRow) maxRow = c.r;
                if (c.c > maxCol) maxCol = c.c;
            });

            // 🔑 Resize sheet BEFORE writing
            sheet.setRowCount(maxRow + 1);
            sheet.setColumnCount(maxCol + 1);

            // Apply cells (value + style)
            sheetData.cells.forEach((c: any) => {
                sheet
                    .getRange(c.r, c.c, 1, 1)
                    .setValues([[{ v: c.v, s: c.s }]]);
            });

            // Column widths
            Object.entries(sheetData.colWidths ?? {}).forEach(([col, w]) => {
                sheet.setColumnWidth(Number(col), Number(w));
            });
        });
    }



    async function exportXlsx() {
        const api = univerAPIRef.current;
        const wb = api?.getActiveWorkbook();
        if (!wb) return;

        const sheets = wb.getSheets().map((sheet: any) => {
            const ROWS = 300;
            const COLS = 50;
            const values = sheet.getRange(0, 0, ROWS, COLS).getValues();

            const cells: any[] = [];
            for (let r = 0; r < values.length; r++) {
                for (let c = 0; c < values[r].length; c++) {
                    if (values[r][c] != null) {
                        cells.push({ r, c, v: values[r][c] });
                    }
                }
            }

            return {
                name: sheet.getName(),
                cells,
            };
        });

        const res = await fetch(`${API_BASE}/export-xlsx`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ sheets }),
        });

        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "export.xlsx";
        a.click();
        URL.revokeObjectURL(url);
    }




    // ---------- UI ----------
    return (
        <div style={{height: "100vh", display: "flex", flexDirection: "column"}}>
            <div style={{ padding: 8, display: "flex", gap: 8 }}>
                <button onClick={runSuggest}>
                    Suggest for selected cell (Ctrl+J)
                </button>

                <label>
                    <input
                        ref={importInputRef}
                        type="file"
                        accept=".xlsx"
                        style={{ display: "none" }}
                        onChange={(e) => {
                            const f = e.target.files?.[0];
                            if (f) importXlsx(f);

                            // allow importing the same file again later
                            e.currentTarget.value = "";
                        }}
                    />

                    <button
                        type="button"
                        onClick={() => importInputRef.current?.click()}
                    >
                        Import XLSX
                    </button>

                </label>

                <button onClick={exportXlsx}>Export XLSX</button>

                {open && (
                    <select
                        autoFocus
                        defaultValue=""
                        onChange={(e) => {
                            const index = Number(e.target.value);
                            if (!Number.isNaN(index)) {
                                applyOption(options[index]);
                            }
                        }}
                    >
                        <option value="" disabled>
                            Choose option…
                        </option>
                        {options.map((opt, idx) => (
                            <option key={idx} value={idx}>
                                {opt.label}
                            </option>
                        ))}
                    </select>
                )}
            </div>


            <div ref={containerRef} style={{flex: 1}}/>
        </div>
    );
}
