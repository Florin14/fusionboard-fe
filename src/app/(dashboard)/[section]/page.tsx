import { Box, Typography } from "@mui/material";

interface SectionPageProps {
  params: {
    section: string;
  };
}

const toTitle = (value: string) =>
  value
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");

export default function SectionPage({ params }: SectionPageProps) {
  const title = toTitle(params.section);

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h5" sx={{ fontWeight: 700, marginBottom: 1 }}>
        {title}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Content is coming soon for this section.
      </Typography>
    </Box>
  );
}
