import { Box } from "@mui/material";

import SearchHeader from "../../components/search/SearchHeader";
import FilterSidebar from "../../components/search/FilterSidebar";
import SearchResults from "../../components/search/SearchResults";
import SearchHistory from "../../components/search/SearchHistory";
import RelatedTopics from "../../components/search/RelatedTopics";

function SearchPage() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#F8FAFC",
      }}
    >
      {/* Header */}

      <SearchHeader />

      {/* Body */}

      <Box
        sx={{
          display: "flex",
          gap: 3,
          px: 3,
          py: 3,
          alignItems: "flex-start",
        }}
      >
        {/* Left */}

        <Box
          sx={{
            width: 290,
            flexShrink: 0,
          }}
        >
          <FilterSidebar />
        </Box>

        {/* Center */}

        <Box
          sx={{
            flex: 1,
            minWidth: 0,
          }}
        >
          <SearchResults />
        </Box>

        {/* Right */}

        <Box
          sx={{
            width: 300,
            flexShrink: 0,
            display: "flex",
            flexDirection: "column",
            gap: 3,
          }}
        >
          <SearchHistory />
          <RelatedTopics />
        </Box>
      </Box>
    </Box>
  );
}

export default SearchPage;