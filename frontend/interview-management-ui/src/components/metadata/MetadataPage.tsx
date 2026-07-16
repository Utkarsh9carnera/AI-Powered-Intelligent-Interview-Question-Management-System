import { useMemo, useState } from "react";

import {
  Box,
  Button,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";

import { useMetadata } from "../../hooks/useMetadata";

import MetadataHeader from "./MetadataHeader";
import MetadataStatistics from "./MetadataStatistics";
import MetadataFilters from "./MetadataFilters";
import MetadataTable from "./MetadataTable";

function MetadataPage() {
  const [globalSearch, setGlobalSearch] =
    useState("");

  const [search, setSearch] =
    useState("");

  const [type, setType] =
    useState("");

  const {
    metadata,
    loading,
    error,
  } = useMetadata();

  const filteredMetadata = useMemo(() => {
    return metadata.filter((item) => {
      const matchesSearch =
        search === "" ||
        item.value
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        item.description
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesType =
        type === "" ||
        item.type === type;

      return (
        matchesSearch &&
        matchesType
      );
    });
  }, [
    metadata,
    search,
    type,
  ]);

  const total =
    filteredMetadata.length;

  const totalTypes =
    new Set(
      filteredMetadata.map(
        (item) => item.type
      )
    ).size;

  return (
    <Box
      sx={{
        p: 4,
      }}
    >
      <MetadataHeader
        search={globalSearch}
        onSearchChange={
          setGlobalSearch
        }
      />

      <Stack
        sx={{
          flexDirection: "row",
          justifyContent:
            "space-between",
          alignItems: "flex-start",
          mb: 4,
        }}
      >
        <Box>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              mb: 1,
            }}
          >
            Manage Metadata
          </Typography>

          <Typography
            sx={{
              color:
                "text.secondary",
            }}
          >
            Manage metadata used
            throughout interview
            questions.
          </Typography>
        </Box>

        <Button
          variant="contained"
          sx={{
            px: 4,
            height: 48,
            borderRadius: 2,
            textTransform: "none",
          }}
        >
          + Add Metadata
        </Button>
      </Stack>

      <MetadataStatistics
        total={total}
        totalTypes={totalTypes}
      />

      <MetadataFilters
        search={search}
        onSearchChange={setSearch}
        type={type}
        onTypeChange={setType}
      />

      {loading && (
        <Box
          sx={{
            display: "flex",
            justifyContent:
              "center",
            mt: 5,
          }}
        >
          <CircularProgress />
        </Box>
      )}

      {!loading &&
        error && (
          <Typography
            sx={{
              mt: 4,
              color:
                "error.main",
            }}
          >
            {error}
          </Typography>
        )}

      {!loading &&
        !error && (
          <MetadataTable
            metadata={
              filteredMetadata
            }
          />
        )}
    </Box>
  );
}

export default MetadataPage;