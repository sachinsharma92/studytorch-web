import { Avatar, Carousel, List, Rate } from "antd";

// Styles
import "./styles.scss";


function OurChamps(props: any) {
  const onChange = (currentSlide: number) => {
    console.log(currentSlide);
  };
  return (
    <div className="our-champ-section">
      <div className="left-sec">
        <h4 className="title-l4">Hear what our champs have to say!</h4>
        <p className="description">From single store, startups, to large multi-store brands.</p>
      </div>
      <div className="right-sec">
        <Carousel afterChange={onChange} autoplay>
          <div className="carousel-item">
            <div className="rate-sec">
              <div>
                <Rate defaultValue={5} />
                <p className="description">
                  With Ehya, we’re able to easily track our performance in full detail. It’s become an essential tool for us to grow and engage with our audience.”
                </p>
              </div>
            </div>
            <List.Item.Meta
              avatar={<Avatar size={45} src="https://images.pexels.com/photos/4355346/pexels-photo-4355346.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" />}
              title={<a href="https://ant.design">Jaquon Hart</a>}
              description="Digital Marketing Executive, Hypebeast"
            />
          </div>
        </Carousel>
      </div>

    </div>
  );
}

export default OurChamps;
