import React, { useCallback, useEffect } from 'react';
import photo from '../../assets/myPhoto.jpg';
import axiosApi from '../../axiosApi';
import Spinner from '../../components/Spinner/Spinner';

const About = () => {
  const [aboutMe, setAboutMe] = React.useState<string[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);

  const fetchAbout = useCallback(async () => {
    setIsLoading(true);

    const information = await axiosApi.get<string | null>('/about.json');
    const informationResponse = information.data;

    try {
      if (informationResponse !== null) {
        const info: string[] = Object.keys(information.data);
        setAboutMe(informationResponse[info]);
      } else {
        setAboutMe([]);
      }
    } catch (error) {
      console.error('Error happened');
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchAbout();
  }, [fetchAbout]);

  let information = (
    <div>
      <h1 className="m-3">About me</h1>
      <div className="info">
        <div className="d-flex gap-4">
          <img src={`${photo}`} alt="me" className="w-50" />
          <div className="information">
            <h4 style={{ lineHeight: 3 }} className="text-start">
              {aboutMe}
            </h4>
          </div>
        </div>
      </div>
    </div>
  );

  if (isLoading) {
    information = (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: '300px' }}
      >
        <Spinner />
      </div>
    );
  }

  return <>{information}</>;
};

export default About;
