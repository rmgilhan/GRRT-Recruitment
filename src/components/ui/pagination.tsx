import  {Button} from "@components/ui/button";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  loading?: boolean;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  loading = false,
  onPageChange,
}: PaginationProps) {
  const changePage = (page: number) => {
    if (page >= 1 && page <= totalPages && !loading) {
      onPageChange(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="flex justify-center items-center gap-2 py-4">
      <Button variant="outline" disabled={currentPage === 1 || loading} onClick={() => changePage(currentPage - 1)}>Previous</Button>

      {[...Array(totalPages)].map((_, i) => {
        const page = i + 1;
        const isActive = currentPage === page;
        return (
          <Button
            key={page}
            variant={isActive ? "default" : "outline"}
            className={`w-9 h-9 ${isActive ? "bg-amber-500 text-white" : ""}`}
            disabled={loading}
            onClick={() => changePage(page)}
          >
            {page}
          </Button>
        );
      })}

      <Button variant="outline" disabled={currentPage === totalPages || loading} onClick={() => changePage(currentPage + 1)}>Next</Button>
    </div>
  );
}

// import { Button } from "@components/ui/button";

// interface PaginationProps {
//   currentPage: number;
//   totalPages: number;
//   loading?: boolean;
//   onPageChange: (page: number) => void;
// }

// export default function Pagination({
//   currentPage,
//   totalPages,
//   loading = false,
//   onPageChange,
// }: PaginationProps) {
//   // Helper to switch page
//   const changePage = (page: number) => {
//     if (page >= 1 && page <= totalPages && !loading) {
//       onPageChange(page);
//       window.scrollTo({ top: 0, behavior: "smooth" });
//     }
//   };

//   return (
//     <div className="flex justify-center items-center gap-2 py-4">
//       <Button
//         variant="outline"
//         disabled={currentPage === 1 || loading}
//         onClick={() => changePage(currentPage - 1)}
//       >
//         Previous
//       </Button>

//       {/* Page indicators */}
//       <div className="flex gap-1">
//         {[...Array(totalPages)].map((_, index) => {
//           const page = index + 1;
//           const isActive = currentPage === page;

//           return (
//             <Button
//               key={index}
//               variant={isActive ? "default" : "outline"}
//               className={`w-9 h-9 ${isActive ? "bg-amber-500 text-white" : ""}`}
//               disabled={loading}
//               onClick={() => changePage(page)}
//             >
//               {page}
//             </Button>
//           );
//         })}
//       </div>

//       <Button
//         variant="outline"
//         disabled={currentPage === totalPages || loading}
//         onClick={() => changePage(currentPage + 1)}
//       >
//         Next
//       </Button>
//     </div>
//   );
// }
