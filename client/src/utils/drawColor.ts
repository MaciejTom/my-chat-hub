const colors = [
    "bg-teal-200",
    "bg-red-200",
    "bg-green-200",
    "bg-purple-200",
    "bg-blue-200",
    "bg-yellow-200",
    "bg-orange-200",
    "bg-pink-200",
    "bg-fuchsia-200",
    "bg-rose-200",
  ];
  export const drawColor = (userId: string): string => {
    const userIdBase10 = parseInt(userId.substring(10), 16);
    const colorIndex = userIdBase10 % colors.length;
    return colors[colorIndex];
  }
