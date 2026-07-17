import { useEffect, useState } from "react";

import metadataService from "../services/metadataService";

import type {
  Metadata,
  CreateMetadataRequest,
  UpdateMetadataRequest,
} from "../types/metadata";

export function useMetadata() {
  const [metadata, setMetadata] =
    useState<Metadata[]>([]);

  const [loading, setLoading] =
    useState(true);

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

  const createMetadata =
    async (
      data: CreateMetadataRequest
    ) => {
      await metadataService.createMetadata(
        data
      );

      await loadMetadata();
    };

  const updateMetadata =
    async (
      id: string,
      data: UpdateMetadataRequest
    ) => {
      await metadataService.updateMetadata(
        id,
        data
      );

      await loadMetadata();
    };

  const deleteMetadata =
    async (id: string) => {
      await metadataService.deleteMetadata(
        id
      );

      await loadMetadata();
    };

  return {
    metadata,
    loading,
    error,
    refresh: loadMetadata,
    createMetadata,
    updateMetadata,
    deleteMetadata,
  };
}