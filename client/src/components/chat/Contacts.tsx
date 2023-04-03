import {
  FormEvent,
  useContext,
  useEffect,
  useRef,
  useState,
  ChangeEventHandler,
  ChangeEvent,
} from "react";
import { ChatUser } from "../../models/ChatUser";
import Contact from "./Contact";
import { fetchMessages, fetchPeople } from "../../api/chatApi";
import { UseAuthUser } from "../../hooks/UseAuthUser";
import { Loading } from "../layout/Loading";

interface ContactsProps {
  onlinePeople: ChatUser[];
  setSelectedUserId: (id: string) => void;
  selectedUserId: string;
}

export const Contacts = (props: ContactsProps) => {
  const [offlinePeople, setOfflinePeople] = useState<ChatUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user, id, setId, setUser } = UseAuthUser();

  useEffect(() => {
    const getPeople = async () => {
      const people = await fetchPeople();

      let uniqPeople = people.filter(
        (element, index, self) =>
          index === self.findIndex((t) => t.userId === element.userId)
      );
      const offlinePeopleWithoutHost = uniqPeople.filter(
        (person) => person.userId !== id
      );
      if (props.onlinePeople.length === 0) {
        setOfflinePeople(offlinePeopleWithoutHost);
      } else {
        const peopleWithoutOnlinePeople = uniqPeople.filter(
          (person) =>
            !props.onlinePeople.some(
              (onlinePerson) => onlinePerson.userId === person.userId
            )
        );
        const offlinePeopleWithoutHost = peopleWithoutOnlinePeople.filter(
          (person) => person.userId !== id
        );
        setOfflinePeople(offlinePeopleWithoutHost);
      }  
        
        setIsLoading(false);
      
    };
    getPeople();
  }, [props.onlinePeople]);

  return (
    <div className="bg-white flex flex-col rounded-md overflow-auto relative sm:w-1/3 flex-1 sm:flex-none">
      {isLoading ? (
        <div className="h-full flex justify-center items-center">
        <Loading />
        </div>
      ) : (
        <div className="flex-grow text-black pb-1 absolute w-full">
          {props.onlinePeople.map((person) => (
            <Contact
              key={person.userId}
              id={person.userId}
              online={true}
              username={person.username}
              onClick={() => {
                props.setSelectedUserId(person.userId);
              }}
              selected={person.userId === props.selectedUserId}
            />
          ))}
          {offlinePeople.map((person) => (
            <Contact
              key={person.userId}
              id={person.userId}
              online={false}
              username={person.username}
              onClick={() => props.setSelectedUserId(person.userId)}
              selected={person.userId === props.selectedUserId}
            />
          ))}
        </div>
      )}
    </div>
  );
};
