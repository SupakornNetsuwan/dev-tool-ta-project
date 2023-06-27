"use client"
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";

const CardUpload = () => {
  return (
    <>
      <Card
        sx={{
          maxWidth: 250,
          minHeight: 200,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "1.5px dashed lightgray",
          cursor: "pointer",
          boxShadow: "none",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          <p className="mb-4 text-gray-500">+ เพิ่มรายวิชา</p>
        </Box>
      </Card>
    </>
  );
};
export default CardUpload;
