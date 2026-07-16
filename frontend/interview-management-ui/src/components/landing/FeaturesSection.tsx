import QuizIcon from "@mui/icons-material/Quiz";
import TrackChangesIcon from "@mui/icons-material/TrackChanges";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";

import { Box } from "@mui/material";

import FeatureCard from "./FeatureCard";

function FeaturesSection() {
  return (
    <Box
      sx={{
        mt: 7,
        mb: 4,

        display: "flex",
        justifyContent: "center",
        gap: 3,

        flexWrap: "wrap",
      }}
    >
      <FeatureCard
        icon={<QuizIcon />}
        title="Practice Smart"
        description="Access a wide range of interview questions curated by experts."
      />

      <FeatureCard
        icon={<TrackChangesIcon />}
        title="Personalized Feedback"
        description="Get AI-powered feedback to improve your answers and communication."
      />

      <FeatureCard
        icon={<TrendingUpIcon />}
        title="Track Progress"
        description="Monitor your progress and focus on areas that need improvement."
      />
    </Box>
  );
}

export default FeaturesSection;