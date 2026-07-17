import { useMemo, useState } from "react";

import {
  Box,
  Button,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";

import { useMetadata } from "../../hooks/useMetadata";

import type { Metadata } from "../../types/metadata";

import MetadataHeader from "../../components/metadata/MetadataHeader";
import MetadataStatistics from "../../components/metadata/MetadataStatistics";
import MetadataFilters from "../../components/metadata/MetadataFilters";
import MetadataTable from "../../components/metadata/MetadataTable";

function ManageMetadataPage() {
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

  const filteredMetadata =
    useMemo(() => {
      return metadata.filter(
        (item) => {
          const matchesSearch =
            search === "" ||
            item.value
              .toLowerCase()
              .includes(
                search.toLowerCase()
              ) ||
            item.type
              .toLowerCase()
              .includes(
                search.toLowerCase()
              );

          const matchesType =
            type === "" ||
            item.type === type;

          return (
            matchesSearch &&
            matchesType
          );
        }
      );
    }, [
      metadata,
      search,
      type,
    ]);

  const total =
    filteredMetadata.length;

  const types =
    new Set(
      filteredMetadata.map(
        (m) => m.type
      )
    ).size;

  const withDescription =
    filteredMetadata.filter(
      (m) =>
        m.description &&
        m.description.trim() !== ""
    ).length;

  const newThisMonth = 0;

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
          alignItems:
            "flex-start",
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
            across interview
            questions.
          </Typography>
        </Box>

        <Button
          variant="contained"
          sx={{
            px: 4,
            height: 48,
            borderRadius: 2,
            textTransform:
              "none",
          }}
        >
          + Add Metadata
        </Button>
      </Stack>

      <MetadataStatistics
        total={total}
        types={types}
        withDescription={
          withDescription
        }
        newThisMonth={
          newThisMonth
        }
      />

      <MetadataFilters
        search={search}
        onSearchChange={
          setSearch
        }
        type={type}
        onTypeChange={
          setType
        }
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

      {!loading && error && (
        <Typography
          sx={{
            mt: 3,
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
            onEdit={() => {}}
            onDelete={() => {}}
          />
        )}
    </Box>
  );
}

export default ManageMetadataPage;