export const createNewUser = async (user: any) => {
  try {
    const response = await fetch("api/auth", {
      method: "POST",
      body: JSON.stringify(user),
    });
    return await response.json();
  } catch (error) {
    return error;
  }
};
