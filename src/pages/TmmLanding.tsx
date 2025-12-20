import * as React from "react";
import {
    Box,
    Button,
    Chip,
    Container,
    Stack,
    Typography,
    Card,
    CardContent,
    Divider,
} from "@mui/material";

import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import AssessmentIcon from "@mui/icons-material/Assessment";
import SearchIcon from "@mui/icons-material/Search";
import GavelIcon from "@mui/icons-material/Gavel";
import ShieldIcon from "@mui/icons-material/Shield";
import PeopleIcon from "@mui/icons-material/People";
import InventoryIcon from "@mui/icons-material/Inventory";
import TimelineIcon from "@mui/icons-material/Timeline";
import InsightsIcon from "@mui/icons-material/Insights";

import Galaxy from "../components/ReactBits/backgrounds/Galaxy/Galaxy.tsx";

const features = [
    {
        icon: <SearchIcon />,
        title: "Поиск тендеров",
        desc: "Интеграция с «Контур.Закупки» через API и умные фильтры по отрасли, региону, заказчику и критериям участия.",
        badge: "Контур.Закупки API",
    },
    {
        icon: <AssessmentIcon />,
        title: "Расчёт предложений",
        desc: "Автоматический расчёт себестоимости и маржи на основе ТЗ заказчика, дилерских каталогов и внешних источников.",
        badge: "Авторасчёт",
    },
    {
        icon: <ShieldIcon />,
        title: "Проверка контрагентов",
        desc: "Комбинация Контур.Фокус, нейросетевого скоринга и ручного подтверждения юристом.",
        badge: "Контур.Фокус + AI",
    },
    {
        icon: <PeopleIcon />,
        title: "База контрагентов",
        desc: "Единый профиль контрагента с историей взаимодействий, категориями надёжности и связками по холдингу.",
        badge: "CRM контрагентов",
    },
    {
        icon: <GavelIcon />,
        title: "Управление ролями",
        desc: "Роли «Руководитель», «Менеджер», «Снабженец», «Юрист» – каждая со своим набором прав и сценариев работы.",
        badge: "RBAC",
    },
    {
        icon: <InventoryIcon />,
        title: "Учёт неликвидов",
        desc: "Привязка складских остатков и неликвидов, приоритизация их включения в коммерческие предложения.",
        badge: "Склад + Тендеры",
    },
    {
        icon: <TimelineIcon />,
        title: "Цикл тендера от А до Я",
        desc: "Статусы и задачи на всех этапах: поиск, анализ, расчёт, подача, торги, контракт и исполнение.",
        badge: "End-to-End",
    },
    {
        icon: <InsightsIcon />,
        title: "Отчётность и аналитика",
        desc: "Дашборды по заявкам, контрагентам, направлениям деятельности и эффективности отдела.",
        badge: "BI-отчёты",
    },
];

const painPoints = [
    "Поиск релевантных тендеров занимает часы каждый день",
    "Сложно быстро посчитать маржу и сравнить несколько сценариев участия",
    "Нет единой системы оценки надёжности контрагентов",
    "Информация о тендерах разрознена между таблицами, письмами и мессенджерами",
];

const valueBullets = [
    "Сокращение времени на поиск тендера и расчёт предложения с часов до минут",
    "Единый цифровой след по каждому тендеру и контрагенту",
    "Прозрачная ответственность между отделами: коммерческий, снабжение, юристы, руководство",
    "Снижение рисков участия в проблемных закупках за счёт системной проверки контрагентов",
];

export const TmmLanding: React.FC = () => {
    return (
        <Box
            sx={{
                minHeight: "100vh",
                bgcolor: "rgb(6, 7, 10)",
                color: "rgba(255,255,255,0.92)",
                position: "relative",
                overflow: "hidden",
                fontFamily:
                    "'Inter', system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
            }}
        >
            <Box
                sx={{
                    position: "absolute",
                    inset: 0,
                    opacity: 0.5,
                    pointerEvents: "none",

                }}
            >
                <Galaxy/>
            </Box>

            <Box
                sx={{
                    position: "absolute",
                    inset: 0,
                    background:
                        "radial-gradient(circle at top, rgba(80,110,255,0.35), transparent 55%), radial-gradient(circle at bottom, rgba(13,209,161,0.15), transparent 60%)",
                    mixBlendMode: "screen",
                    pointerEvents: "none",

                }}
            />

            <Box sx={{ position: "relative", zIndex: 1, pb: 10}}>
                <Header />
                <Hero />
                <KeyNumbers />
                <ProblemsSection />
                <FeaturesSection />
                <WorkflowSection />
                <RolesSection />
                <CTASection />
                <Footer />
            </Box>
        </Box>
    );
};

// ---------------------------------------------------------------------------
// Header
// ---------------------------------------------------------------------------

const Header: React.FC = () => {
    return (
        <Box
            component="header"
            sx={{
                borderBottom: "1px solid rgba(255,255,255,0.06)",
                backdropFilter: "blur(16px)",
                bgcolor: "rgba(0,0,0,0.6)",
                position: "sticky",
                top: 0,
                zIndex: 10,
            }}
        >
            <Container maxWidth="xl">
                <Box
                    sx={{
                        py: 1.5,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: 2,
                    }}
                >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1.2 }}>
                        <Box
                            sx={{
                                width: 32,
                                height: 32,
                                borderRadius: "40%",
                                background:
                                    "conic-gradient(from 160deg, #4f46e5, #22c55e, #0ea5e9, #4f46e5)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                boxShadow: "0 0 18px rgba(59,130,246,0.8)",
                            }}
                        >
                            <AutoAwesomeIcon sx={{ fontSize: 20 }} />
                        </Box>
                        <Box>
                            <Typography
                                variant="subtitle1"
                                sx={{ fontWeight: 700, letterSpacing: "0.08em" }}
                            >
                                TMM
                            </Typography>
                            <Typography
                                variant="caption"
                                sx={{ opacity: 0.7, textTransform: "uppercase" }}
                            >
                                Turbo Metallurg Montazh
                            </Typography>
                        </Box>
                    </Box>

                    <Stack
                        direction="row"
                        spacing={1}
                        sx={{ alignItems: "center", display: { xs: "none", sm: "flex" } }}
                    >
                        <Chip
                            label="Система для коммерческого отдела"
                            size="small"
                            variant="outlined"
                            sx={{
                                borderColor: "rgba(148,163,184,0.6)",
                                color: "rgba(226,232,240,0.9)",
                                backdropFilter: "blur(10px)",
                            }}
                        />
                        <Button
                            size="small"
                            variant="outlined"
                            sx={{
                                borderRadius: 999,
                                textTransform: "none",
                                borderColor: "rgba(148,163,184,0.7)",
                            }}
                        >
                            Войти
                        </Button>
                        <Button
                            size="small"
                            variant="contained"
                            sx={{
                                borderRadius: 999,
                                textTransform: "none",
                                px: 2.4,
                                background:
                                    "linear-gradient(120deg, #4f46e5, #22c55e, #06b6d4)",
                                boxShadow:
                                    "0 0 20px rgba(79,70,229,0.5), 0 0 32px rgba(16,185,129,0.45)",
                            }}
                        >
                            Запросить демо
                        </Button>
                    </Stack>
                </Box>
            </Container>
        </Box>
    );
};

// ---------------------------------------------------------------------------
// Hero
// ---------------------------------------------------------------------------

const Hero: React.FC = () => {
    return (
        <Container maxWidth="xl" sx={{ pt: 8, pb: 6 }}>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                    gap: 6,
                    alignItems: "center",
                }}
            >
                {/* Левая колонка */}
                <Box sx={{ flex: 1 }}>
                    <Stack spacing={3}>
                        <Chip
                            label={
                                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                    <AutoAwesomeIcon sx={{ fontSize: 18 }} />
                                    <span>Единая платформа для управления тендерами</span>
                                </Box>
                            }
                            sx={{
                                alignSelf: "flex-start",
                                borderRadius: 999,
                                borderColor: "rgba(129,140,248,0.7)",
                                color: "rgba(199,210,254,0.9)",
                                bgcolor: "rgba(30,64,175,0.5)",
                                backdropFilter: "blur(10px)",
                            }}
                            variant="outlined"
                        />

                        <Typography
                            variant="h2"
                            sx={{
                                fontWeight: 800,
                                letterSpacing: "-0.04em",
                                lineHeight: 1.1,
                            }}
                        >
                            TMM —
                            <br />
                            «цифровой мозг»
                            <br />
                            коммерческого отдела в тендерах.
                        </Typography>

                        <Typography
                            variant="subtitle1"
                            sx={{ opacity: 0.82, maxWidth: 640 }}
                        >
                            Система для компаний, участвующих в закупках по 44-ФЗ и 223-ФЗ:
                            автоматизирует поиск тендеров, расчёт предложений, проверку
                            контрагентов и совместную работу подразделений — от менеджера до
                            юриста и руководителя.
                        </Typography>

                        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                            <Button
                                variant="contained"
                                size="large"
                                sx={{
                                    textTransform: "none",
                                    borderRadius: 999,
                                    px: 4,
                                    py: 1.3,
                                    fontSize: 16,
                                    background:
                                        "linear-gradient(120deg, #4f46e5, #22c55e, #06b6d4)",
                                    boxShadow:
                                        "0 0 25px rgba(79,70,229,0.65), 0 0 40px rgba(16,185,129,0.5)",
                                }}
                            >
                                Назначить демо
                            </Button>
                            <Button
                                variant="outlined"
                                size="large"
                                sx={{
                                    textTransform: "none",
                                    borderRadius: 999,
                                    px: 3.2,
                                    py: 1.3,
                                    fontSize: 15,
                                    borderColor: "rgba(148,163,184,0.8)",
                                }}
                            >
                                Скачать презентацию
                            </Button>
                        </Stack>

                        <Stack direction="row" spacing={3} sx={{ mt: 1 }}>
                            <Metric label="↓ до 60%" value="Время на расчёт КП" />
                            <Metric label="↑ до 25%" value="Конверсия в участие" />
                            <Metric label="1 платформа" value="вместо десятка таблиц" />
                        </Stack>
                    </Stack>
                </Box>

                {/* Правая колонка */}
                <Box sx={{ flex: 1 }}>
                    <Box
                        sx={{
                            borderRadius: 3,
                            p: 2,
                            bgcolor: "rgba(15,23,42,0.9)",
                            border: "1px solid rgba(148,163,184,0.3)",
                            boxShadow:
                                "0 18px 50px rgba(15,23,42,0.8), 0 0 60px rgba(56,189,248,0.4)",
                        }}
                    >
                        <Typography
                            variant="subtitle2"
                            sx={{ opacity: 0.8, mb: 1, letterSpacing: "0.1em" }}
                        >
                            ЦИКЛ ТЕНДЕРА В TMM
                        </Typography>

                        <Stack spacing={1.4}>
                            {[
                                "Поиск закупки",
                                "Скоринг контрагента",
                                "Разбор ТЗ",
                                "Расчёт предложения",
                                "Согласование роли (юрист / снабженец / руководитель)",
                                "Подача заявки",
                                "Торги / переторжка",
                                "Контракт и исполнение",
                            ].map((step, index) => (
                                <StepPill key={step} index={index + 1} label={step} />
                            ))}
                        </Stack>

                        <Divider
                            sx={{ my: 2.5, borderColor: "rgba(51,65,85,0.9)" }}
                        />

                        <Typography
                            variant="body2"
                            sx={{ opacity: 0.8, mb: 1, fontWeight: 500 }}
                        >
                            Прозрачность для руководителя:
                        </Typography>
                        <Typography
                            variant="body2"
                            sx={{ opacity: 0.7, mb: 1.5, maxWidth: 360 }}
                        >
                            В режиме реального времени видно, кто и на каком этапе «держит
                            мяч»: менеджер, снабженец, юрист или контрагент.
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Container>
    );
};

const Metric: React.FC<{ label: string; value: string }> = ({
                                                                label,
                                                                value,
                                                            }) => (
    <Box>
        <Typography variant="subtitle2" sx={{ opacity: 0.7 }}>
            {label}
        </Typography>
        <Typography variant="body1" sx={{ fontWeight: 600 }}>
            {value}
        </Typography>
    </Box>
);

const StepPill: React.FC<{ index: number; label: string }> = ({
                                                                  index,
                                                                  label,
                                                              }) => (
    <Box
        sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            p: 1,
            borderRadius: 999,
            bgcolor: "rgba(15,23,42,0.9)",
            border: "1px solid rgba(51,65,85,0.9)",
        }}
    >
        <Box
            sx={{
                width: 26,
                height: 26,
                borderRadius: "50%",
                bgcolor:
                    index === 1
                        ? "rgba(59,130,246,0.25)"
                        : "rgba(148,163,184,0.18)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 13,
                fontWeight: 600,
            }}
        >
            {index}
        </Box>
        <Typography variant="body2">{label}</Typography>
    </Box>
);

// ---------------------------------------------------------------------------
// KeyNumbers
// ---------------------------------------------------------------------------

const KeyNumbers: React.FC = () => (
    <Container maxWidth="xl" sx={{ pb: 5 }}>
        <Box
            sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                gap: 3,
            }}
        >
            {/* Левая */}
            <Box sx={{ flex: 1 }}>
                <Typography
                    variant="body2"
                    sx={{
                        textTransform: "uppercase",
                        letterSpacing: "0.18em",
                        opacity: 0.7,
                        mb: 1,
                    }}
                >
                    Для кого
                </Typography>
                <Typography variant="h6" sx={{ maxWidth: 320, opacity: 0.85 }}>
                    Для коммерческих отделов компаний, регулярно участвующих в публичных
                    и коммерческих закупках.
                </Typography>
            </Box>

            {/* Правая */}
            <Box
                sx={{
                    flex: 2,
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 2,
                }}
            >
                <NumberCard
                    title="Коммерческий отдел"
                    subtitle="Управление воронкой тендеров"
                />
                <NumberCard
                    title="Снабжение"
                    subtitle="Каталоги, неликвиды, логистика"
                />
                <NumberCard
                    title="Юристы"
                    subtitle="Риски, проверка контрагентов"
                />
                <NumberCard
                    title="Руководство"
                    subtitle="Единая картина по тендерам и марже"
                />
            </Box>
        </Box>
    </Container>
);

const NumberCard: React.FC<{ title: string; subtitle: string }> = ({
                                                                       title,
                                                                       subtitle,
                                                                   }) => (
    <Card
        variant="outlined"
        sx={{
            borderRadius: 3,
            borderColor: "rgba(51,65,85,0.9)",
            bgcolor: "rgba(15,23,42,0.8)",
            backdropFilter: "blur(10px)",
            width: { xs: "100%", sm: "calc(50% - 16px)", md: "calc(25% - 16px)" },
        }}
    >
        <CardContent>
            <Typography variant="subtitle1" sx={{ mb: 0.5, color: "rgba(255,255,255,0.7)" }}>
                {title}
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.7, color: "rgba(255,255,255,0.7)" }}>
                {subtitle}
            </Typography>
        </CardContent>
    </Card>
);

// ---------------------------------------------------------------------------
// Problems Section
// ---------------------------------------------------------------------------

const ProblemsSection: React.FC = () => (
    <Container maxWidth="xl" sx={{ py: 6 }}>
        <Box
            sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                gap: 4,
            }}
        >
            {/* Левая */}
            <Box sx={{ flex: 1 }}>
                <Typography
                    variant="overline"
                    sx={{ letterSpacing: "0.18em", opacity: 0.7 }}
                >
                    Проблема
                </Typography>
                <Typography
                    variant="h4"
                    sx={{
                        mt: 1.5,
                        mb: 1,
                        fontWeight: 700,
                        letterSpacing: "-0.03em",
                    }}
                >
                    Тендеры — хаос из таблиц,
                    <br />
                    писем и неявных рисков.
                </Typography>
                <Typography variant="body1" sx={{ opacity: 0.8 }}>
                    TMM собирает все процессы в единую систему, где каждая заявка,
                    контрагент и документ имеют понятный статус, ответственного и историю.
                </Typography>
            </Box>

            {/* Правая */}
            <Box
                sx={{
                    flex: 1,
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 2,
                }}
            >
                {painPoints.map((p) => (
                    <Card
                        key={p}
                        variant="outlined"
                        sx={{
                            borderRadius: 3,
                            borderColor: "rgba(127,29,29,0.7)",
                            bgcolor: "rgba(15,23,42,0.95)",
                            width: { xs: "100%", sm: "calc(50% - 16px)" },
                        }}
                    >
                        <CardContent>
                            <Typography
                                variant="subtitle2"
                                sx={{ mb: 0.5, color: "#fecaca" }}
                            >
                                Боль отдела
                            </Typography>
                            <Typography variant="body2" sx={{ opacity: 0.85, color: "rgba(255,255,255,0.7)" }}>
                                {p}
                            </Typography>
                        </CardContent>
                    </Card>
                ))}
            </Box>
        </Box>
    </Container>
);

// ---------------------------------------------------------------------------
// Features Section
// ---------------------------------------------------------------------------

const FeaturesSection: React.FC = () => (
    <Container maxWidth="xl" sx={{ py: 4 }}>
        <Typography
            variant="overline"
            sx={{ letterSpacing: "0.18em", opacity: 0.7 }}
        >
            Ключевые возможности
        </Typography>
        <Typography
            variant="h4"
            sx={{
                mt: 1.5,
                mb: 3,
                fontWeight: 700,
                letterSpacing: "-0.03em",
            }}
        >
            Всё, что нужно для работы с закупками —
            <br />
            в одной системе.
        </Typography>

        <Box
            sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 2.5,
            }}
        >
            {features.map((f) => (
                <Box
                    key={f.title}
                    sx={{
                        width: {
                            xs: "100%",
                            sm: "calc(50% - 20px)",
                            md: "calc(25% - 20px)",
                        },
                    }}
                >
                    <Card
                        variant="outlined"
                        sx={{
                            height: "100%",
                            borderRadius: 3,
                            borderColor: "rgba(51,65,85,0.9)",
                            bgcolor: "rgba(15,23,42,0.9)",
                            display: "flex",
                            flexDirection: "column",
                            color: "white"
                        }}
                    >
                        <CardContent sx={{ flexGrow: 1 }}>
                            <Box
                                sx={{
                                    width: 36,
                                    height: 36,
                                    borderRadius: "50%",
                                    bgcolor: "rgba(51,65,85,0.95)",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    mb: 1.2,
                                }}
                            >
                                {React.cloneElement(f.icon)}
                            </Box>
                            <Typography variant="subtitle1" sx={{ mb: 0.5 }}>
                                {f.title}
                            </Typography>
                            <Typography variant="body2" sx={{ opacity: 0.75, mb: 1.2 }}>
                                {f.desc}
                            </Typography>
                            <Chip
                                label={f.badge}
                                size="small"
                                sx={{
                                    borderRadius: 999,
                                    borderColor: "rgba(129,140,248,0.6)",
                                    color: "rgba(199,210,254,0.9)",
                                }}
                                variant="outlined"
                            />
                        </CardContent>
                    </Card>
                </Box>
            ))}
        </Box>
    </Container>
);

// ---------------------------------------------------------------------------
// Workflow Section
// ---------------------------------------------------------------------------

const WorkflowSection: React.FC = () => (
    <Container maxWidth="xl" sx={{ py: 6 }}>
        <Box
            sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                gap: 4,
            }}
        >
            <Box sx={{ flex: 1 }}>
                <Typography
                    variant="overline"
                    sx={{ letterSpacing: "0.18em", opacity: 0.7 }}
                >
                    Эффект для бизнеса
                </Typography>
                <Typography
                    variant="h4"
                    sx={{
                        mt: 1.5,
                        mb: 1.5,
                        fontWeight: 700,
                        letterSpacing: "-0.03em",
                    }}
                >
                    Понятный и управляемый
                    <br />
                    цикл тендера.
                </Typography>
                <Stack spacing={1.2}>
                    {valueBullets.map((b) => (
                        <Typography key={b} variant="body2" sx={{ opacity: 0.8 }}>
                            • {b}
                        </Typography>
                    ))}
                </Stack>
            </Box>

            <Box sx={{ flex: 1 }}>
                <Card
                    variant="outlined"
                    sx={{
                        borderRadius: 3,
                        borderColor: "rgba(51,65,85,0.9)",
                        bgcolor: "rgba(15,23,42,0.95)",
                    }}
                >
                    <CardContent>
                        <Typography variant="subtitle1" sx={{ mb: 1.5, color: "white" }}>
                            Как TMM работает «под капотом»
                        </Typography>
                        <Stack spacing={1}>
                            <WorkflowRow
                                stage="1. Поиск тендеров"
                                detail="Интеграция с «Контур.Закупки» и фильтрация по параметрам компании."
                            />
                            <WorkflowRow
                                stage="2. Анализ и расчёт"
                                detail="Парсинг ТЗ, подбор позиций из дилерских каталогов, учёт неликвидов, расчёт цен и маржи."
                            />
                            <WorkflowRow
                                stage="3. Проверка контрагента"
                                detail="Запрос данных в Контур.Фокус, собственный скоринг, верификация юристом."
                            />
                            <WorkflowRow
                                stage="4. Согласование и подача"
                                detail="Задачи и статусы для коммерческого, снабжения и юристов. Журнал решений и комментариев."
                            />
                            <WorkflowRow
                                stage="5. Исполнение и отчётность"
                                detail="Контроль исполнения контракта, учёт допсоглашений и сводная аналитика по результатам."
                            />
                        </Stack>
                    </CardContent>
                </Card>
            </Box>
        </Box>
    </Container>
);

const WorkflowRow: React.FC<{ stage: string; detail: string }> = ({
                                                                      stage,
                                                                      detail,
                                                                  }) => (
    <Box sx={{ display: "flex", flexDirection: "row", gap: 2, py: 1 }}>
        <Box
            sx={{
                width: 6,
                borderRadius: 999,
                bgcolor:
                    "linear-gradient(180deg, rgba(59,130,246,0.8), rgba(34,197,94,0.9))",
            }}
        />
        <Box>
            <Typography variant="subtitle2" sx={{ color: "white" }}>{stage}</Typography>
            <Typography variant="body2" sx={{ opacity: 0.76, color: "white" }}>
                {detail}
            </Typography>
        </Box>
    </Box>
);

// ---------------------------------------------------------------------------
// Roles Section
// ---------------------------------------------------------------------------

const RolesSection: React.FC = () => (
    <Container maxWidth="xl" sx={{ py: 5 }}>
        <Typography
            variant="overline"
            sx={{ letterSpacing: "0.18em", opacity: 0.7 }}
        >
            Ролевая модель
        </Typography>
        <Typography
            variant="h4"
            sx={{
                mt: 1.5,
                mb: 3,
                fontWeight: 700,
                letterSpacing: "-0.03em",
            }}
        >
            Каждому сотруднику — свой взгляд
            <br />
            на тендер.
        </Typography>

        <Box
            sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 2.5,
            }}
        >
            <RoleCard
                icon={<PeopleIcon />}
                title="Руководитель"
                items={[
                    "Дашборд по всем активным тендерам",
                    "План/факт по выручке и марже",
                    "Контроль загрузки команды и узких мест",
                ]}
            />
            <RoleCard
                icon={<SearchIcon />}
                title="Менеджер"
                items={[
                    "Поиск и отбор релевантных закупок",
                    "Карточка заявки с историей действий",
                    "Чат и задачи по каждой закупке",
                ]}
            />
            <RoleCard
                icon={<InventoryIcon />}
                title="Снабженец"
                items={[
                    "Каталоги поставщиков и неликвиды",
                    "Управление сроками поставки и логистикой",
                    "Сравнение условий от разных поставщиков",
                ]}
            />
            <RoleCard
                icon={<ShieldIcon />}
                title="Юрист"
                items={[
                    "Скоринг контрагентов и чек-листы рисков",
                    "Замечания по документации и контракту",
                    "Шаблоны согласованных формулировок",
                ]}
            />
        </Box>
    </Container>
);

const RoleCard: React.FC<{
    icon: React.ReactElement;
    title: string;
    items: string[];
}> = ({ icon, title, items }) => (
    <Box
        sx={{
            width: { xs: "100%", sm: "calc(50% - 20px)", md: "calc(25% - 20px)" },
        }}
    >
        <Card
            variant="outlined"
            sx={{
                borderRadius: 3,
                borderColor: "rgba(51,65,85,0.9)",
                bgcolor: "rgba(15,23,42,0.9)",
                color: "white"
            }}
        >
            <CardContent>
                <Box
                    sx={{
                        width: 32,
                        height: 32,
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        bgcolor: "rgba(148,163,184,0.18)",
                        mb: 1.3,
                        p: 0.5
                    }}
                >
                    {React.cloneElement(icon)}
                </Box>
                <Typography variant="subtitle1" sx={{ mb: 1 }}>
                    {title}
                </Typography>
                <Stack spacing={0.6}>
                    {items.map((i) => (
                        <Typography key={i} variant="body2" sx={{ opacity: 0.78 }}>
                            • {i}
                        </Typography>
                    ))}
                </Stack>
            </CardContent>
        </Card>
    </Box>
);

// ---------------------------------------------------------------------------
// CTA Section
// ---------------------------------------------------------------------------

const CTASection: React.FC = () => (
    <Container maxWidth="xl" sx={{ py: 7 }}>
        <Card
            variant="outlined"
            sx={{
                borderRadius: 4,
                borderColor: "rgba(79,70,229,0.8)",
                boxShadow:
                    "0 24px 80px rgba(15,23,42,0.95), 0 0 60px rgba(79,70,229,0.7)",
                backgroundColor: "rgba(29,33,113,0.89)"
            }}
        >
            <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: { xs: "column", md: "row" },
                        gap: 3,
                        alignItems: "center",
                    }}
                >
                    <Box sx={{ flex: 1, color: "white" }}>
                        <Typography
                            variant="h4"
                            sx={{
                                mb: 1.5,
                                fontWeight: 700,
                                letterSpacing: "-0.03em",
                            }}
                        >
                            Хотите превратить тендеры
                            <br />
                            из хаоса в управляемый процесс?
                        </Typography>
                        <Typography variant="body1" sx={{ opacity: 0.85, mb: 2 }}>
                            Оставьте заявку на демо TMM — покажем на примере ваших реальных
                            закупок, как система сокращает время на поиск и расчёт, повышая
                            прозрачность и управляемость.
                        </Typography>
                        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                            <Button
                                variant="contained"
                                size="large"
                                sx={{
                                    textTransform: "none",
                                    borderRadius: 999,
                                    px: 4,
                                    py: 1.3,
                                    fontSize: 16,
                                    background:
                                        "linear-gradient(120deg, #22c55e, #4f46e5, #06b6d4)",
                                }}
                            >
                                Запросить демо
                            </Button>
                            <Button
                                variant="outlined"
                                size="large"
                                sx={{
                                    textTransform: "none",
                                    borderRadius: 999,
                                    px: 3,
                                    py: 1.3,
                                    fontSize: 15,
                                    borderColor: "rgba(191,219,254,0.8)",
                                    color: "rgba(219,234,254,0.9)",
                                }}
                            >
                                Получить коммерческое предложение
                            </Button>
                        </Stack>
                    </Box>

                    <Box sx={{ flex: 1 }}>
                        <Box
                            sx={{
                                p: 2,
                                borderRadius: 3,
                                background:
                                    "linear-gradient(120deg, #4f46e5, #06b6d4)",
                                border: "1px solid rgba(148,163,184,0.6)",
                                color: "white"
                            }}
                        >
                            <Typography variant="subtitle2" sx={{ mb: 1 }}>
                                Что вы получите на демо:
                            </Typography>
                            <Stack spacing={0.8}>
                                <Typography variant="body2" sx={{ opacity: 0.85 }}>
                                    • Обзор ключевых сценариев под ваши процессы.
                                </Typography>
                                <Typography variant="body2" sx={{ opacity: 0.85 }}>
                                    • Примеры интеграции с «Контур.Закупки» и «Контур.Фокус».
                                </Typography>
                                <Typography variant="body2" sx={{ opacity: 0.85 }}>
                                    • Расчёт экономического эффекта внедрения TMM.
                                </Typography>
                            </Stack>
                        </Box>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    </Container>
);

// ---------------------------------------------------------------------------
// Footer
// ---------------------------------------------------------------------------

const Footer: React.FC = () => (
    <Container maxWidth="xl" sx={{ pt: 3, pb: 5 }}>
        <Divider sx={{ mb: 2, borderColor: "rgba(30,41,59,0.9)" }} />

        <Box
            sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                alignItems: { xs: "flex-start", sm: "center" },
                justifyContent: "space-between",
                gap: 1.5,
            }}
        >
            <Typography variant="body2" sx={{ opacity: 0.7 }}>
                © {new Date().getFullYear()} TMM — Turbo Metallurg Montazh.
            </Typography>

            <Stack direction="row" spacing={2}>
                <Typography variant="body2" sx={{ opacity: 0.7 }}>
                    Политика конфиденциальности
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.7 }}>
                    Контакты
                </Typography>
            </Stack>
        </Box>
    </Container>
);

export default TmmLanding;