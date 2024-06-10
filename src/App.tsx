import { useEffect, useState } from 'react';

function App() {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState();

  const tesseractImage = async (body) => {
    try {
      setError(null);
      setLoading(true);
      const response = await fetch("https://auto-calendar-api.onrender.com/upload", {
        method: "POST",
        body
      });
      const res = await response.json();

      setData(res.message);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const form = new FormData();

    form.append("image", event.target.fileUpload.files[0]);
    await tesseractImage(form);
  }


  const renderData = () => {
    if(error) {
      return (
        <div>
          <p>{error}</p>
        </div>
      );
    }

    if(loading) {
      return (
        <div>
          <p>Loading...</p>
        </div>
      );
    }

    if(!data) {
      return (
        <div>
          <p>No data!</p>
        </div>
      );
    }

    return data ? <p>{data}</p> : null
  }

  return (
    <div>
    <form onSubmit={handleSubmit}>
      <input name="fileUpload" type="file" />
      <input type="submit" />
    </form>

      {renderData()}
    </div>
  )
}

export default App
