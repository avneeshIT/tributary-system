import { useState } from "react";
import axios from "axios";

function CreateTribute({ refreshTributes, closeModal, tribute }) 
{  const [title, setTitle] = useState(tribute ? tribute.title : "");
const [description, setDescription] = useState(tribute ? tribute.description : "");
const [image, setImage] = useState(null);

const isEdit = tribute ? true : false;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("image", image);

    try {
      if (isEdit) {

  await axios.put(
    `https://tributary-system.onrender.com/api/tributes/${tribute._id}`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

} else {

  await axios.post(
    "https://tributary-system.onrender.com/api/tributes",
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

}

      alert("Tribute created successfully");
      refreshTributes();
    closeModal();

    } catch (error) {
      console.error(error);
      alert("Error creating tribute");
    }
  };

 return (
  <div className="tribute-modal">

<h2>{isEdit ? "Edit Tribute" : "Create Tribute"}</h2>

    <form onSubmit={handleSubmit} className="tribute-form">

      <input
        type="text"
        placeholder="Tribute Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <textarea
        placeholder="Write about the hero..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />

      <input
        type="file"
        onChange={(e) => setImage(e.target.files[0])}
        required
      />

      <button type="submit">
{isEdit ? "Update Tribute" : "Create Tribute"}      </button>

    </form>

  </div>
);
}

export default CreateTribute;