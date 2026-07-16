import {
  useEffect,
  useState,
} from "react";

import metadataService from "../services/metadataService";

import type { Metadata } from "../types/metadata";

export function useMetadata() {
  const [metadata, setMetadata] =
    useState<Metadata[]>([]);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const loadMetadata =
    async () => {
      try {
        setLoading(true);

        const response =
          await metadataService.getMetadata();

        setMetadata(
          response.data.data
        );

        setError("");
      } catch (err: any) {
        setError(
          err.response?.data?.message ??
            "Failed to load metadata."
        );
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    loadMetadata();
  }, []);

  return {
    metadata,
    loading,
    error,
    refresh: loadMetadata,
  };
}