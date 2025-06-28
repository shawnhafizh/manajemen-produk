function Form({ isEditing, formData, handleChange, handleSubmit, handleCancel, toggleModal }) {
  return (
    <div>
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md text-surface dark:bg-surface-dark dark:text-black shadow-secondary-1">
        <h2 className="text-xl font-medium mb-4">{isEditing ? 'Edit Produk' : 'Tambah Produk'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium">Nama</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              onInvalid={(e) => {
                  if (!e.target.validity.valid) {
                    if (!e.target.value) {
                      e.target.setCustomValidity("Harga tidak boleh kosong!");
                    } else {
                      e.target.setCustomValidity("");
                    }
                  }
                }}
              onInput={(e) => e.target.setCustomValidity("")}
              className="w-full px-4 py-2 mt-1 border rounded"
              placeholder="Nama"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="price" className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium">Harga</label>
            <input
              type="number"
              id="email"
              name="price"
              value={formData.price}
              onChange={handleChange}
              onInvalid={(e) => e.target.setCustomValidity("Harga tidak boleh kosong!")}
              onInput={(e) => e.target.setCustomValidity("")}
              className="w-full px-4 py-2 mt-1 border rounded"
              placeholder="Masukkan Harga"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="stock" className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium">Stok</label>
            <input
              type="number"
              id="age"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              onInvalid={(e) => e.target.setCustomValidity("Stok tidak boleh kosong!")}
              onInput={(e) => e.target.setCustomValidity("")}
              className="w-full px-4 py-2 mt-1 border rounded"
              placeholder="Jumlah Stok"
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 mr-2 text-white bg-gray-500 rounded hover:bg-gray-600"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
    </div>
  );
}

export default Form;
