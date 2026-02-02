import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@components/ui/card";
import { Input } from "@components/ui/input";
import {Button} from "@components/ui/button";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import useJob from "@hooks/useJob";
import useCandidates from "@hooks/useCandidates";
import Pagination from "@components/ui/pagination";
import SEO from "@components/SEO"; // 👈 Add your SEO component
import Swal from "sweetalert2"; // 👈 Use Swal for consistent UI

export default function LinkedInSearchPage() {
  const [position, setPosition] = useState("");
  const [location, setLocation] = useState("");
  const resultsPerPage = 10;

  const {
    results,
    loading,
    error,
    currentPage,
    totalPages,
    isCached,
    linkedlnSearch,
    setCurrentPage
  } = useJob();

  const { addToInitial, loading: candidateLoading } = useCandidates();

  // Optional: auto-load default search
  useEffect(() => {
    handleSearch(1, "site:linkedin.com/in developer philippines");
  }, []);

  const handleSearch = async (page = 1, overrideQuery?: string) => {
    const finalQuery = overrideQuery || `site:linkedin.com/in ${position.trim()} ${location.trim()}`.trim();
    if (!finalQuery) return;
    await linkedlnSearch(finalQuery, page, resultsPerPage);
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    handleSearch(newPage);
  };

  const handleAddToReview = async (user: any) => {
    await addToInitial({
      name: user.name,
      linkedInUrl: user.linkedInUrl,
      positionApplied: user.positionApplied,
    });
    alert(`${user.name} added to Initial Screening`);
  };

  return (
    <div className="p-4 sm:p-6 max-w-6xl mx-auto space-y-6">
      {/* 1. Use the SEO component here */}
      <SEO title="LinkedIn Search" description="Sourcing tool for GRRT." />
      <h1 className="text-2xl sm:text-3xl font-bold text-center">LinkedIn Search Tool</h1>

      {/* Search Form */}
      <Card className="p-4">
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <Input
              placeholder="Job Position (e.g., Fullstack Developer)"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
            />
            <Input
              placeholder="Location (e.g., Cebu)"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
            <Button
              onClick={() => handleSearch(1)}
              disabled={loading || !position || !location}
              className="bg-amber-400 hover:bg-amber-500 flex justify-center items-center"
            >
              {loading ? <Loader2 className="animate-spin" /> : "Search"}
            </Button>
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </CardContent>
      </Card>

      {/* Loading */}
      {(loading || candidateLoading) && (
        <p className="text-center text-gray-500">Loading results...</p>
      )}

      {/* Results */}
      {results && results.length > 0 && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {results.map((user, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card className="p-4 shadow flex flex-col justify-between h-full">
                  <CardContent className="space-y-2">
                    <h2 className="font-semibold text-lg sm:text-xl">{user.name || "Unnamed"}</h2>
                    <p className="text-sm text-gray-600">{user.positionApplied || "Unknown role"}</p>
                    {user.linkedInUrl && (
                      <a
                        href={user.linkedInUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline"
                      >
                        View Profile
                      </a>
                    )}
                  </CardContent>
                  <div className="flex gap-2 mt-2">
                    <Button
                      onClick={() => handleAddToReview(user)}
                      className="flex-1 bg-green-500 hover:bg-green-600"
                    >
                      Add to Review
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            loading={loading}
            onPageChange={handlePageChange}
          />

          {/* Cache info */}
          {isCached && <p className="text-center text-sky-500 font-medium">⚡ Served from cache</p>}
        </>
      )}

      {!loading && results?.length === 0 && (
        <p className="text-center text-gray-500">No results found.</p>
      )}
    </div>
  );
}
