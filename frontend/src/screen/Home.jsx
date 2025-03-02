import { useState } from "react"
// import { UserContext } from "../context/user.context"
import axios from "../config/axios"
const Home = () => {

  // const {user } = useContext(UserContext)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [projectName, setProjectName] = useState(null)

  function createProject(e){
    e.preventDefault();
    console.log({projectName})
    axios.post('/projects/create', {
      name: projectName,
  })
      .then((res) => {
          console.log(res)
          setIsModalOpen(false)
      })
      .catch((error) => {
          console.log(error)
      })
}
  return (
     <main className="p-4">
       <div className="projects">
       <button
                    onClick={() => setIsModalOpen(true)}
                    className="project p-4 border border-slate-300 rounded-md">
                    New Project
                    <i className="ri-link ml-2"></i>
        </button>
       </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-md shadow-md">
            <h2 className="text-xl mb-4">Create Project</h2>
            <form 
            onSubmit={createProject}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Project Name</label>
                <input
                  onChange={(e)=>setProjectName(e.target.value)}
                  value={projectName}
                  type="text"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  required
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  className="mr-2 py-2 px-4 bg-gray-500 text-white rounded-md"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="py-2 px-4 bg-blue-500 text-white rounded-md"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

     </main>
  )
}

export default Home