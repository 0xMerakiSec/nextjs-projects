// eslint-disable-next-line @typescript-eslint/no-explicit-any
function UserProfilePage({ params }: any) {
  return (
    <div className="flex flex-col min-h-screen justify-start items-center content-center mt-4 pt-10">
      <h1 className="text-2xl font-semibold ">Profile</h1>
      <hr />
      <p className="text-lg ">
        Page:{" "}
        <span className="bg-lime-500 px-3 py-1 text-black rounded-lg">
          {params.id}
        </span>
      </p>
    </div>
  );
}

export default UserProfilePage;
