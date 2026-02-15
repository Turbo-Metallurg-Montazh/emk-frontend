import React, { useEffect, useMemo, useRef, useState } from "react";
import {
    Box,
    Paper,
    TextField,
    IconButton,
    Typography,
    CircularProgress,
    Divider,
    ClickAwayListener,
    Collapse,
    Stack,
    Tooltip,
} from "@mui/material";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import SmartToyRoundedIcon from "@mui/icons-material/SmartToyRounded";

type ChatRole = "user" | "assistant";

type ChatMessage = {
    id: string;
    role: ChatRole;
    content: string;
    ts: number;
};

type AskResponse = {
    answer: string;
};

function uid() {
    return Math.random().toString(16).slice(2) + Date.now().toString(16);
}

export type AiAskWidgetProps = {
    /** URL твоего прокси-эндпоинта */
    endpoint?: string; // default: "/api/public-ai/chat"
    /** Заголовок, который показывается в раскрытом виде */
    title?: string; // default: "Спросить AI"
    /** Системная инструкция для модели (передаётся на бэк) */
    systemPrompt?: string;
};

export const AiAskWidget: React.FC<AiAskWidgetProps> = ({
                                                            endpoint = "/api/public-ai/chat",
                                                            title = "Спросить AI",
                                                            systemPrompt = "Ты универсальный помощник для сотрудников. Отвечай кратко и по делу. Если вопрос неоднозначный — уточни.",
                                                        }) => {
    const [open, setOpen] = useState(false);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);

    const [messages, setMessages] = useState<ChatMessage[]>(() => [
        {
            id: uid(),
            role: "assistant",
            content: "Привет! Спроси что угодно 🙂",
            ts: Date.now(),
        },
    ]);

    const containerRef = useRef<HTMLDivElement | null>(null);
    const listRef = useRef<HTMLDivElement | null>(null);

    const canSend = useMemo(() => input.trim().length > 0 && !loading, [input, loading]);

    useEffect(() => {
        // автоскролл вниз при новых сообщениях
        if (!open) return;
        const el = listRef.current;
        if (!el) return;
        el.scrollTop = el.scrollHeight;
    }, [messages, open]);

    const close = () => setOpen(false);
    const toggleOpen = () => setOpen((v) => !v);

    const send = async () => {
        const question = input.trim();
        if (!question || loading) return;

        const userMsg: ChatMessage = { id: uid(), role: "user", content: question, ts: Date.now() };
        setMessages((prev) => [...prev, userMsg]);
        setInput("");
        setOpen(true);
        setLoading(true);

        try {
            const resp = await fetch(endpoint, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({
                    systemPrompt,
                    message: question,
                    // можно передавать историю, если хочешь контекст:
                    history: messages
                        .filter((m) => m.role !== "assistant" || m.content !== "Привет! Спроси что угодно 🙂")
                        .slice(-10)
                        .map((m) => ({ role: m.role, content: m.content })),
                }),
            });

            if (!resp.ok) {
                const text = await resp.text().catch(() => "");
                throw new Error(`HTTP ${resp.status}: ${text || resp.statusText}`);
            }

            const data = (await resp.json()) as AskResponse;

            const assistantMsg: ChatMessage = {
                id: uid(),
                role: "assistant",
                content: data.answer ?? "(пустой ответ)",
                ts: Date.now(),
            };

            setMessages((prev) => [...prev, assistantMsg]);
        } catch (e: any) {
            const assistantMsg: ChatMessage = {
                id: uid(),
                role: "assistant",
                content: `Не удалось получить ответ: ${e?.message ?? "unknown error"}`,
                ts: Date.now(),
            };
            setMessages((prev) => [...prev, assistantMsg]);
        } finally {
            setLoading(false);
        }
    };

    const onKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
        if (e.key === "Escape") {
            close();
            return;
        }
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            void send();
        }
    };

    return (
        <Box
            ref={containerRef}
            sx={{
                position: "fixed",
                top: 16,
                right: 16,
                zIndex: (theme) => theme.zIndex.modal + 1,
                width: open ? 420 : 280, // "немного вширь" при раскрытии
                transition: "width 180ms ease",
            }}
        >
            <ClickAwayListener onClickAway={() => setOpen(false)}>
                <Paper
                    elevation={8}
                    sx={{
                        borderRadius: 3,
                        overflow: "hidden",
                        backdropFilter: "blur(8px)",
                    }}
                >
                    {/* Верхняя строка (всегда видна) */}
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                            px: 1,
                            py: 1,
                        }}
                    >
                        <Box sx={{ display: "flex", alignItems: "center", pl: 0.5 }}>
                            <SmartToyRoundedIcon fontSize="small" />
                        </Box>

                        <TextField
                            size="small"
                            placeholder={title}
                            fullWidth
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onFocus={() => setOpen(true)}
                            onKeyDown={onKeyDown}
                            multiline={open}
                            minRows={open ? 2 : 1}
                            maxRows={open ? 5 : 1}
                            sx={{
                                "& .MuiOutlinedInput-root": { borderRadius: 2 },
                            }}
                        />

                        <Tooltip title={open ? "Закрыть" : "Открыть"}>
                            <IconButton size="small" onClick={toggleOpen}>
                                {open ? <CloseRoundedIcon /> : <Typography sx={{ fontWeight: 700 }}>AI</Typography>}
                            </IconButton>
                        </Tooltip>

                        <Tooltip title="Отправить">
              <span>
                <IconButton size="small" onClick={send} disabled={!canSend}>
                  {loading ? <CircularProgress size={18} /> : <SendRoundedIcon />}
                </IconButton>
              </span>
                        </Tooltip>
                    </Box>

                    <Collapse in={open} timeout={180} unmountOnExit>
                        <Divider />
                        {/* История */}
                        <Box
                            ref={listRef}
                            sx={{
                                maxHeight: 280,
                                overflow: "auto",
                                px: 1.25,
                                py: 1,
                                background: (theme) =>
                                    theme.palette.mode === "dark" ? "rgba(0,0,0,0.20)" : "rgba(0,0,0,0.02)",
                            }}
                        >
                            <Stack spacing={1}>
                                {messages.map((m) => (
                                    <Box
                                        key={m.id}
                                        sx={{
                                            alignSelf: m.role === "user" ? "flex-end" : "flex-start",
                                            maxWidth: "92%",
                                        }}
                                    >
                                        <Paper
                                            variant="outlined"
                                            sx={{
                                                px: 1.25,
                                                py: 0.75,
                                                borderRadius: 2,
                                                bgcolor:
                                                    m.role === "user"
                                                        ? (theme) => (theme.palette.mode === "dark" ? "rgba(255,255,255,0.08)" : "rgba(25,118,210,0.08)")
                                                        : "background.paper",
                                            }}
                                        >
                                            <Typography variant="caption" sx={{ opacity: 0.7 }}>
                                                {m.role === "user" ? "Вы" : "AI"}
                                            </Typography>
                                            <Typography variant="body2" sx={{ whiteSpace: "pre-wrap" }}>
                                                {m.content}
                                            </Typography>
                                        </Paper>
                                    </Box>
                                ))}
                                {loading && (
                                    <Box sx={{ display: "flex", gap: 1, alignItems: "center", pl: 0.5 }}>
                                        <CircularProgress size={16} />
                                        <Typography variant="body2" sx={{ opacity: 0.7 }}>
                                            Думаю…
                                        </Typography>
                                    </Box>
                                )}
                            </Stack>
                        </Box>
                    </Collapse>
                </Paper>
            </ClickAwayListener>
        </Box>
    );
};