import { useState } from 'react';
import Table from '../components/Table';
import { useGetPropertyData } from '../services/useGetData';
import { tableData } from '../types/types';

function App() {
  const [formData, setFormData] = useState({
    name: '',
    TIN: ''
  });
  const [properties, setProperties] = useState<tableData[]>([]);
  const [loading, setLoading] = useState(false);
  const { fetchProperties } = useGetPropertyData();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await fetchProperties(formData);
      setProperties(data);
    } catch (error) {
      console.error('Error fetching properties:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <div className="text-2xl font-bold mb-6">REAP API Testing</div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-2 w-full max-w-md mx-auto mb-8"
      >
        <label htmlFor="name" className="font-medium">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          className="border p-2 rounded"
        />

        <label htmlFor="TIN" className="font-medium">TIN</label>
        <input
          type="text"
          name="TIN"
          value={formData.TIN}
          onChange={handleInputChange}
          className="border p-2 rounded"
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 mt-4 text-white p-2 rounded-md hover:bg-blue-600 disabled:bg-blue-300"
        >
          {loading ? 'Loading...' : 'Submit'}
        </button>
      </form>

      {properties.length > 0 && <Table data={properties} />}
    </div>
  );
}

export default App;
