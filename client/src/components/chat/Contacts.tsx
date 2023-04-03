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

interface ContactsProps {
  onlinePeople: ChatUser[];
  setSelectedUserId: (id: string) => void;
  selectedUserId: string;
}

export const Contacts = (props: ContactsProps) => {
  const [offlinePeople, setOfflinePeople] = useState<ChatUser[]>([]);
  const { user, id, setId, setUser } = UseAuthUser();

  useEffect(() => {
    const getPeople = async () => {
      if (props.onlinePeople) {
        const people = await fetchPeople();

        let uniqPeople = people.filter(
          (element, index, self) =>
            index === self.findIndex((t) => t.userId === element.userId)
        );

        const offlinePeople = uniqPeople.filter(
          (person) =>
            !props.onlinePeople.some(
              (onlinePerson) => onlinePerson.userId === person.userId
            )
        );
        const offlinePeopleWithoutHost = offlinePeople.filter(
          (person) => person.userId !== id
        );
        setOfflinePeople(offlinePeopleWithoutHost);
      }
    };
    getPeople();
    //const firstArr = [{username: 'maciek',userId: '1234123'}, {username: 'maciek2',userId: '12341232'}, {username: 'maciek3',userId: '12341234'}]
    //const secondArr = [{username: 'maciek4',userId: '1234123444'}, {username: 'maciek222',userId: '1234123'}, {username: 'maciek34',userId: '1231241234'}]
  }, [props.onlinePeople]);

  return (
    <div className="bg-white flex flex-col rounded-md overflow-auto relative sm:w-1/3 flex-1 sm:flex-none">
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
    </div>
  );
};
