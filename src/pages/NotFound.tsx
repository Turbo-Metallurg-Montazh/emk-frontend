import { Box, Button, Typography, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
    const navigate = useNavigate();

    return (
        <Box
            minHeight="100vh"
            display="flex"
            alignItems="center"
            justifyContent="center"
            sx={{
                background: "#020617", // тёмный фон страницы
            }}
        >
            {/* Тёмная карточка-контейнер */}
            <Box
                sx={{
                    background: "#0b1220",
                    borderRadius: 4,
                    border: "1px solid rgba(255,255,255,0.06)",
                    boxShadow: "0 20px 60px rgba(0,0,0,0.45)",
                    p: { xs: 3, sm: 4 },
                    maxWidth: 420,
                    width: "100%",
                }}
            >
                {/* Светлая акцентная карточка */}
                <Box
                    sx={{
                        background: "#f8fafc",
                        borderRadius: 3,
                        borderLeft: "4px solid #22c55e",
                        boxShadow:
                            "0 16px 40px rgba(15,23,42,0.25), 0 4px 10px rgba(15,23,42,0.15)",
                        p: 3,
                    }}
                >
                    <Stack spacing={2} alignItems="center" textAlign="center">
                        <Typography
                            variant="h3"
                            fontWeight={700}
                            color="#0f172a"
                        >
                            404
                        </Typography>

                        <Typography
                            variant="h6"
                            fontWeight={600}
                            color="#0f172a"
                        >
                            Страница не найдена
                        </Typography>

                        <Typography
                            variant="body2"
                            color="#475569"
                        >
                            Возможно, страница была удалена, переименована
                            или вы перешли по неверной ссылке.
                        </Typography>

                        <Button
                            variant="contained"
                            size="large"
                            onClick={() => navigate("/")}
                            sx={{
                                mt: 1,
                                background:
                                    "linear-gradient(135deg, #22c55e, #16a34a)",
                                boxShadow:
                                    "0 8px 20px rgba(34,197,94,0.35)",
                                textTransform: "none",
                                fontWeight: 600,
                                px: 4,
                                "&:hover": {
                                    background:
                                        "linear-gradient(135deg, #16a34a, #15803d)",
                                },
                            }}
                        >
                            Вернуться на главную
                        </Button>
                    </Stack>
                </Box>
            </Box>
        </Box>
    );
}