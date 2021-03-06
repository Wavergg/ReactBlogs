import { useState } from "react";
import { useHistory } from "react-router";

const Create = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [author, setAuthor] = useState("waver");
  const [isPending, setIsPending] = useState(false);

  const history = useHistory();

  return (
    <div className="create">
      <h2>Add a new blog</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const blog = { title, body, author };

          setIsPending(true);

          fetch(`http://localhost:8000/blogs`, {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(blog),
          }).then(() => {
            console.log("new blog added");
            setIsPending(false);
            history.push("/");
          });
        }}
      >
        <label>Blog Title</label>
        <input
          type="text"
          required
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <label>Content</label>
        <textarea
          required
          value={body}
          onChange={(e) => {
            setBody(e.target.value);
          }}
        ></textarea>
        <label>Author</label>
        <select
          value={author}
          onChange={(e) => {
            setAuthor(e.target.value);
          }}
        >
          <option value="waver">Waver</option>
          <option value="yoshi">Yoshi</option>
        </select>
        {!isPending && <button>Add blog</button>}
        {isPending && <button disabled>Adding blog...</button>}
      </form>
    </div>
  );
};

export default Create;
