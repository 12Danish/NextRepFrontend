import searchIcon from "./assets/searchIcon.svg"
export default function Search() {
    return (
        <div
          className="bg-gray-200 p-1 min-w-[200px] max-w-[250px] 
        sm:min-w-[200px]sm:max-w-[250px] md:min-w-[300px] 
        md:max-w-[350px] lg:min-w-[400px] lg:max-w-[500px] 
        2xl:min-w-[600px] 2xl:max-w-[700px] mr-8 rounded-lg flex items-center p-1">
          <img src={searchIcon} className="md:w-6 md:h-6 h-4 w-4" />
          <input placeholder="Search" className="md:mx-6 mx-4 w-full" />
        </div>
    )
}