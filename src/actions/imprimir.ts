"use server";

import fs from "fs";
import path from "path";

export const Imprimir = async (data: any) => {
  const orderSummaryJson = JSON.stringify(data, null, 2);
  const filePath = path.join("src/data", "interview.json");
  fs.writeFileSync(filePath, orderSummaryJson, "utf-8");
};
