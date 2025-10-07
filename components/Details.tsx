export const Details = () => {
  return (
    <article className="flex flex-row justify-around">
      <section className="flex flex-col">
        <span>Card Dimensions: 380px by 479px</span>
        <span>Card Shadow Color: rgba(0, 0, 0, 0.1)</span>
        <span>Card Shadow Hover Color: rgba(0, 0, 0, 0.26)</span>
        <span>Card Picture Dimentions: 180px diamater</span>
        <span>Button/Select Dimentions: 180px by 60px</span>
        <span>Button disabled color: #aaaaaa</span>
      </section>
      <section className="flex flex-col">
        <a href="https://codesandbox.io/" target="_blank"> Code Sandbox </a>
        <a href="https://randomuser.me/api/?page=1&results=6" target="_blank"> Random User API </a>
      </section>
    </article>
  );
};
