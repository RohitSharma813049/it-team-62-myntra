import { categoriesData } from "../../../Data/Catogery";
import { useNavigate } from "react-router-dom";

const Destopcatogery = () => {
  const navigate = useNavigate();

  const categoryColors = [
    { text: "text-red-500", underline: "after:bg-red-500" },
    { text: "text-pink-500", underline: "after:bg-pink-500" },
    { text: "text-orange-500", underline: "after:bg-orange-500" },
    { text: "text-yellow-500", underline: "after:bg-yellow-500" },
    { text: "text-green-500", underline: "after:bg-green-500" },
    { text: "text-blue-500", underline: "after:bg-blue-500" },
  ];

  return (
    <ul className="hidden md:flex gap-2 font-bold text-sm text-gray-700">
      {categoriesData.map((item, catIndex) => {
        const color = categoryColors[catIndex % categoryColors.length];

        return (
          <li key={item.id} className="relative group cursor-pointer">

            {/* CATEGORY NAME */}
            <span
              onClick={() =>
                navigate(`/search?query=${encodeURIComponent(item.name)}`)
              }
              className={`px-3 py-5 inline-block relative transition-colors cursor-pointer
              group-hover:${color.text}
              after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px]
              ${color.underline}
              after:scale-x-0 group-hover:after:scale-x-100
              after:transition-transform after:origin-left`}
            >
              {item.name}
            </span>

            {/* MEGA MENU */}
            <div className="fixed inset-x-0 top-16 hidden group-hover:flex justify-center z-50">
              <div className="bg-white shadow-2xl rounded-xl w-[1150px] max-w-[90vw] px-6 py-4 border border-gray-100">

                <div className="grid grid-cols-5 gap-x-10 gap-y-6">

                  {item.sections.map((section, index) => (
                    <div key={index}>
                      <h4 className={`font-semibold mb-3 text-sm ${color.text}`}>
                        {section.title}
                      </h4>

                      <ul className="space-y-[6px]">
                        {section.items.map((subItem, i) => (
                          <li
                            key={i}
                            onClick={() =>
                              navigate(
                                `/search?query=${encodeURIComponent(subItem)}`
                              )
                            }
                            className="text-gray-600 text-sm hover:text-black cursor-pointer hover:font-bold"
                          >
                            {subItem}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}

                </div>
              </div>
            </div>

          </li>
        );
      })}
    </ul>
  );
};

export default Destopcatogery;