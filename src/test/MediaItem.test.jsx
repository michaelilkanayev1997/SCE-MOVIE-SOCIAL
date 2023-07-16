import { configure, shallow } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import React from "react";
import MediaItem from "../components/MediaItem";
import "jest-extended";
import { Link } from "react-router-dom";

configure({ adapter: new Adapter() });

describe("MediaItem component", () => {
    it('should render without errors', () => {
        const media = { title: 'Movie title', poster_path: '/path/to/poster.jpg' };
        const mediaType = 'movie';
        const wrapper = shallow(<MediaItem media={media} mediaType={mediaType} />);
        expect(wrapper).toHaveLength(1);
    });

    it('should render a link with the correct props', () => {
        const media = { id: 123 };
        const mediaType = 'movie';
        const wrapper = shallow(<MediaItem media={media} mediaType={mediaType} />);
        expect(wrapper.find(Link)).toHaveLength(2);
        
      });

      const movieMedia = {
        title: 'The Matrix',
        poster_path: '/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg',
        release_date: '1999-03-30',
      };
      const tvMedia = {
        name: 'Stranger Things',
        backdrop_path: '/9Wg5CRFixInsZBYKSEiUDwqvIrx.jpg',
        first_air_date: '2016-07-15',
      };
      
      it('should render correctly with movie media', () => {
        const wrapper = shallow(<MediaItem media={movieMedia} mediaType="movie" />);
        expect(wrapper).toMatchSnapshot();
      });
      
      it('should render correctly with tv media', () => {
        const wrapper = shallow(<MediaItem media={tvMedia} mediaType="tv" />);
        expect(wrapper).toMatchSnapshot();
      });
      
      it('should display the "photo-coming-soon" image when poster path is not provided', () => {
        const mediaWithoutPoster = { title: 'Movie without poster' };
        const wrapper = shallow(<MediaItem media={mediaWithoutPoster} mediaType="movie" />);
        expect(wrapper.find('.movie-card').prop('style').backgroundImage).toContain('photo-coming-soon.jpg');
      });
      
      it("sets the poster path correctly", () => {
        const media = {
          poster_path: "poster_path.jpg",
          backdrop_path: "",
          mediaPoster: "",
          profile_path: "",
        };
        const wrapper = shallow(<MediaItem media={media} />);
        const posterPath = wrapper.find(".movie-card").prop("style").backgroundImage;
    
        });

});