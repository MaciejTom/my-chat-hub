import {
  useEffect,
  useState,
} from "react";
import { ChatUser } from "../../models/ChatUser";
import {Contact} from "./Contact";
import { fetchPeople } from "../../api/chatApi";
import { UseAuthUser } from "../../hooks/UseAuthUser";
import { Loading } from "../layout/Loading";
import { clearPeopleList } from "../../utils/clearListPeopleList";

interface ContactsProps {
  onlinePeople: ChatUser[] | null;
  setSelectedUserId: (id: string) => void;
  selectedUserId: string;
}

export const Contacts = (props: ContactsProps) => {
  const [offlinePeople, setOfflinePeople] = useState<ChatUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = UseAuthUser();

  useEffect(() => {
    const getPeople = async () => {
      if (props.onlinePeople === null) {
        return
      }
      const people = await fetchPeople();
      const cleanPeople = clearPeopleList(people, id);
      if (props.onlinePeople?.length === 0) {
        setOfflinePeople(cleanPeople);
      } else {
        const peopleWithoutOnlinePeople = cleanPeople.filter(
          (person) =>
            !props.onlinePeople?.some(
              (onlinePerson) => onlinePerson.userId === person.userId
            )
        );
        const offlinePeopleWithoutHost = clearPeopleList(peopleWithoutOnlinePeople, id);
        setOfflinePeople(offlinePeopleWithoutHost);
      }  
        
        setIsLoading(false);
      
    };
    getPeople();
  }, [props.onlinePeople]);

  return (
    <div className="bg-white flex flex-col rounded-md overflow-auto relative flex-1 sm:w-1/3 sm:flex-none">
      {isLoading ? (
        <div className="h-full flex justify-center items-center">
        <Loading />
        </div>
      ) : (
        <div className="flex-grow text-black pb-1 absolute w-full">
          {props.onlinePeople?.map((person) => (
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
