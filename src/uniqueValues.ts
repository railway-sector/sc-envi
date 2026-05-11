export const primaryLabelColor = "#d1d5db";
export const valueLabelColor = "#d1d5db";

// Layter list
export async function defineActions(event: any) {
  const { item } = event;

  if (item.layer.type !== "group") {
    item.panel = {
      content: "legend",
      open: true,
    };
  }

  item.title === "Chainage" ? (item.visible = false) : (item.visible = true);
}
