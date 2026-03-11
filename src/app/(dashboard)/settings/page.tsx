"use client";

import { Box, Typography } from "@mui/material";
import { useTranslation } from "@/i18n/useTranslation";
import { SupportedLanguage } from "@/store/slices/languageSlice";
import GlassCard from "@/components/dashboard/GlassCard";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import TranslateOutlinedIcon from "@mui/icons-material/TranslateOutlined";

const LANGS: { code: SupportedLanguage; label: string; native: string }[] = [
  { code: "en", label: "English", native: "EN" },
  { code: "ro", label: "Romanian", native: "RO" },
];

export default function SettingsPage() {
  const { languageData, language, setLanguage } = useTranslation();

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
      <Box>
        <Typography sx={{ fontSize: "1.75rem", fontWeight: 800, color: "#F9FAFB", letterSpacing: "-0.03em" }}>
          {languageData?.Settings ?? "Settings"}
        </Typography>
        <Typography sx={{ fontSize: "0.8rem", color: "#6B7280", mt: 0.5 }}>
          Manage your dashboard preferences
        </Typography>
      </Box>

      <GlassCard hover={false}>
        <Box sx={{ px: 3, py: 2, borderBottom: "1px solid rgba(255,255,255,0.04)", display: "flex", alignItems: "center", gap: 1 }}>
          <TranslateOutlinedIcon sx={{ fontSize: 16, color: "#6B7280" }} />
          <Typography sx={{ fontSize: "0.8rem", fontWeight: 700, color: "#F9FAFB" }}>Language</Typography>
        </Box>
        <Box sx={{ p: 3, display: "flex", gap: 2 }}>
          {LANGS.map((l) => {
            const active = language === l.code;
            return (
              <Box
                key={l.code}
                onClick={() => setLanguage(l.code)}
                sx={{
                  width: 130,
                  p: 2.5,
                  borderRadius: "14px",
                  border: `2px solid ${active ? "rgba(99,102,241,0.5)" : "rgba(255,255,255,0.06)"}`,
                  backgroundColor: active ? "rgba(99,102,241,0.06)" : "transparent",
                  cursor: "pointer",
                  textAlign: "center",
                  position: "relative",
                  transition: "all 0.2s ease",
                  "&:hover": { borderColor: active ? "rgba(99,102,241,0.5)" : "rgba(255,255,255,0.12)", backgroundColor: "rgba(255,255,255,0.05)" },
                }}
              >
                {active && (
                  <Box sx={{ position: "absolute", top: 8, right: 8, width: 18, height: 18, borderRadius: "50%", backgroundColor: "#6366F1", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <CheckOutlinedIcon sx={{ fontSize: 11, color: "#fff" }} />
                  </Box>
                )}
                <Typography sx={{ fontSize: "1.1rem", fontWeight: 800, color: active ? "#818CF8" : "#4B5563", mb: 0.5 }}>
                  {l.native}
                </Typography>
                <Typography sx={{ fontSize: "0.75rem", fontWeight: 600, color: active ? "#E5E7EB" : "#6B7280" }}>
                  {l.label}
                </Typography>
              </Box>
            );
          })}
        </Box>
      </GlassCard>
    </Box>
  );
}
