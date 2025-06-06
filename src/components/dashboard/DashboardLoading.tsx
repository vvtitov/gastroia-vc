
import React from "react";

export const DashboardLoading: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-[80vh]">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gastro"></div>
    </div>
  );
};
