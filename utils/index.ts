import { Transaction } from "@/types";

export function exportToCSV(
  data: Transaction[],
  filename = "transactions.csv"
) {
  if (!data || data.length === 0) {
    console.error("No data available to export.");
    return;
  }

  // Extract headers dynamically
  const headers = Object.keys(data[0]);

  // Create CSV rows
  const csvRows = [
    headers.join(","), // Header row
    ...data.map((row) =>
      headers.map((header) => `"${row[header] || ""}"`).join(",")
    ), // Data rows
  ];

  // Convert rows to a CSV string
  const csvContent = csvRows.join("\n");

  // Create a Blob
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });

  // Generate a download link
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.style.visibility = "hidden";

  // Trigger download
  document.body.appendChild(link);
  link.click();

  // Cleanup
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
