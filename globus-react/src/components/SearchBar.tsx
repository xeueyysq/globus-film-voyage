import { Input, Select, Space} from 'antd';
import axios from 'axios';
import { useStore } from '../useStore';
import type { GetProps } from 'antd';
import { useState } from 'react';

type SearchProps = GetProps<typeof Input.Search>;

const { Search } = Input;

const options = [
    {
        value: 'multi',
        label: 'All',
    },
    {
        value: 'movie',
        label: 'Movies',
    },
    {
        value: 'tv',
        label: 'TV-Shows',
    },
    {
        value: 'person',
        label: 'People',
    }
]

const SearchBar = () => {
    const { setSearchData } = useStore();
    const [type, setType] = useState('multi');

    const search = async (value: string) => {
        try {
            console.log(value, type)
            const response = await axios.get(`/api/search`, {
                params: { value, type }
            });
            setSearchData(response.data);
        } catch (error) {
            console.error('Поиск фильмов: Ошибка обращения к серверу', error);
        }
    };

    const onSearch: SearchProps['onSearch'] = (value) => search(value);

    // По option
    const handleChange = (value: string) => {
        setType(value)
    }

    return (
        //Space.Compact создает шов между select и search
        <Space.Compact size='large'> 
            <Select 
            defaultValue='multi'
            options={options}
            //Called when select an option or input value change
            //Так же как onSearch
            onChange={handleChange}
            // всплывающее окно «Соответствие выбора ширины»
            popupMatchSelectWidth={false}/>

            <Search 
            placeholder="Поиск фильмов"
            // value={title}
            // onChange={(e) => setTitle(e.target.value)}
            onSearch={onSearch}
            style={{ width: 400 }} />
        </Space.Compact>
    );
};

export default SearchBar;