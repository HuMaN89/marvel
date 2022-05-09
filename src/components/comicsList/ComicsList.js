import "./ComicsList.scss";
import img1 from "../../img/UW.png";
import img2 from "../../img/x-men.png";

const ComicsList = () => {
  const comics = [
    {
      src: img1,
      alt: "ultimate war",
      name: "ULTIMATE X-MEN VOL. 5: ULTIMATE WAR TPB",
      price: "9.99$",
      id: "1",
    },
    {
      src: img2,
      alt: "x-men",
      name: "X-Men: Days of Future Past",
      price: "NOT AVAILABLE",
      id: "2",
    },
    {
      src: img1,
      alt: "ultimate war",
      name: "ULTIMATE X-MEN VOL. 5: ULTIMATE WAR TPB",
      price: "9.99$",
      id: "3",
    },
    {
      src: img2,
      alt: "x-men",
      name: "X-Men: Days of Future Past",
      price: "NOT AVAILABLE",
      id: "4",
    },
    {
      src: img1,
      alt: "ultimate war",
      name: "ULTIMATE X-MEN VOL. 5: ULTIMATE WAR TPB",
      price: "9.99$",
      id: "5",
    },
    {
      src: img2,
      alt: "x-men",
      name: "X-Men: Days of Future Past",
      price: "NOT AVAILABLE",
      id: "6",
    },
    {
      src: img1,
      alt: "ultimate war",
      name: "ULTIMATE X-MEN VOL. 5: ULTIMATE WAR TPB",
      price: "9.99$",
      id: "7",
    },
    {
      src: img2,
      alt: "x-men",
      name: "X-Men: Days of Future Past",
      price: "NOT AVAILABLE",
      id: "8",
    },
  ];
  return (
    <div className="comics__list">
      <ul className="comics__grid">
        {comics.map((item) => {
          return (
            <li className="comics__item" key={item.id}>
              <a href="#">
                <img
                  src={item.src}
                  alt={item.alt}
                  className="comics__item-img"
                />
                <div className="comics__item-name">{item.name}</div>
                <div className="comics__item-price">{item.price}</div>
              </a>
            </li>
          );
        })}
      </ul>
      <button className="button button__main button__long">
        <div className="inner">load more</div>
      </button>
    </div>
  );
};

export default ComicsList;
