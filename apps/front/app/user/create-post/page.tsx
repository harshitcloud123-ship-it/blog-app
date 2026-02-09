import CreatePostContainer from "./_components/CreatePostContainer";
// import UpsertPostForm from "./_components/upsertPostForm";

const CreatePostPage = () => {
  return (
    <div className="flex justify-center items-center mt-24 md:mt-6">
      <div className="bg-white shadow-md rounded-md p-6 max-w-2xl w-full">
        <h2 className="text-lg text-center font-bold text-slate-700 mb-6">
          Create a New Post
        </h2>
        <CreatePostContainer />
      </div>
    </div>
  );
};

export default CreatePostPage;
