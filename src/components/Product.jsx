function Product({ products, handleEdit, handleDelete, handleSort, getSortIconClass }) {
  return (
    <div>
      <div className="flex flex-col max-w-screen max-h-[500px]">
      <div className="overflow-x-hidden">
        <div className="inline-block min-w-full ">
          <div className="overflow-hidden">
            <table className="min-w-full text-left text-md font-light text-surface dark:text-black">
              <thead className="border-b border-neutral-200 bg-neutral-100 font-medium/10">
                <tr>
                  <th
                    className="px-6 py-4 cursor-pointer"
                    onClick={() => handleSort('name')}
                  >
                    Nama {getSortIconClass('name')}
                  </th>
                  <th
                    className="px-6 py-4 cursor-pointer"
                    onClick={() => handleSort('email')}
                  >
                    Email {getSortIconClass('email')}
                  </th>
                  <th
                    className="px-6 py-4 cursor-pointer"
                    onClick={() => handleSort('age')}
                  >
                    Umur {getSortIconClass('age')}
                  </th>
                  <th className="px-6 py-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => (
                  <tr key={index} className="border-b border-neutral-200">
                    <td className="whitespace-nowrap px-6 py-4">{product.name}</td>
                    <td className="whitespace-nowrap px-6 py-4">{product.price}</td>
                    <td className="whitespace-nowrap px-6 py-4">{product.stock}</td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="flex space-x-3">
                        <button onClick={() => handleEdit(index)}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-5 h-5 text-blue-500"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487z"
                            />
                          </svg>
                        </button>
                        <button onClick={() => handleDelete(index)}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-5 h-5 text-red-500"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M14.74 9L14.394 18m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                            />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Product
