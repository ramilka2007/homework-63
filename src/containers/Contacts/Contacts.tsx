import React, { useCallback, useEffect } from 'react';
import axiosApi from '../../axiosApi';
import Spinner from '../../components/Spinner/Spinner';
import { Contacts } from '../../types';

const Contacts = () => {
  const [contacts, setContacts] = React.useState<Contacts>({
    instagram: '',
    instagramLink: '',
    github: '',
    githubLink: '',
  });
  const [isLoading, setIsLoading] = React.useState(false);

  const fetchAbout = useCallback(async () => {
    setIsLoading(true);
    const contacts = await axiosApi.get<string | null>('/contacts.json');
    const contactsResponse = contacts.data;

    try {
      if (contactsResponse !== null) {
        setContacts(contactsResponse);
      } else {
        setContacts(null);
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
      <h3>{contacts.instagram}:</h3>
      <a href={contacts.instagramLink} className="fs-4 btn btn-outline-success">
        {contacts.instagram}
      </a>
      <h3 className="mt-4">{contacts.github}:</h3>
      <a href={contacts.githubLink} className="fs-4 btn btn-outline-success">
        {contacts.github}
      </a>
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

export default Contacts;
