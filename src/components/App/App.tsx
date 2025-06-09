import { useEffect, useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useDebounce } from 'use-debounce';
import { fetchNotes } from "../../services/noteService";
import NoteList from "../NoteList/NoteList";
import Pagination from "../Pagination/Pagination";
import NoteModal from "../NoteModal/NoteModal";
import NoteForm from "../NoteForm/NoteForm";
import SearchBox from "../SearchBox/SearchBox";
import css from "./App.module.css";



export default function App() {  
    const [inputValue, setInputValue] = useState('');
    const [page, setPage] = useState<number>(1);
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [debouncedValue] = useDebounce(inputValue, 300)

    const onClose = () => setIsOpen(false);
    const onOpen = () => setIsOpen(true);

    useEffect(() => {
        setPage(1);
    }, [debouncedValue]);

    const { data, isLoading, isSuccess } = useQuery({
        queryKey: ['notes', debouncedValue, page],
        queryFn: () => fetchNotes(debouncedValue, page),
        placeholderData: keepPreviousData,
    })
    
return <>
<div className={css.app}>
    <header className={css.toolbar}>
        <SearchBox value={inputValue} onSearch={setInputValue}/>
        
        {isSuccess && data.totalPages > 1 && <Pagination totalPages={data.totalPages} currentPage={page} onPageChange={setPage} />}
            
        <button className={css.button} onClick={onOpen}>Create note +</button>
    </header>
</div>
{isLoading && <p>Loading...</p>}
{isSuccess && data.notes.length > 0 && <NoteList notes={data.notes} />}
{isOpen && <NoteModal onClose={onClose}>
    <NoteForm onClose={onClose} />
</NoteModal>}
</>
}

