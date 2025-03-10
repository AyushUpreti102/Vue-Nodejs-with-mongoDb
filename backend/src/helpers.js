const getSearchCondition = (req) => {
  const searchCondition = {};

  const searchQuery = req.query.search || "";
  const dateFilter = req.query.date || "";
  const locationFilter = req.query.location || "";
  const categoryFilter = req.query.category || "";

  // Search Query condition (if provided)
  if (searchQuery) {
    searchCondition.name = { $regex: searchQuery, $options: "i" };
  }

  // Date filter condition (if provided)
  if (dateFilter) {
    const startDate = new Date(dateFilter); // Convert the frontend date to a Date object
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 1);
    searchCondition.date = { $gte: startDate, $lt: endDate }; // You can modify this based on your date logic
  }

  // Location filter condition (if provided)
  if (locationFilter) {
    searchCondition.location = { $regex: locationFilter, $options: "i" }; // case-insensitive location match
  }

  // Category filter condition (if provided)
  if (categoryFilter) {
    searchCondition.category = { $regex: categoryFilter, $options: "i" }; // case-insensitive category match
  }

  return searchCondition;
};

module.exports = {
  getSearchCondition,
};
