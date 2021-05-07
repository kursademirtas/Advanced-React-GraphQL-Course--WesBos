import { useLazyQuery } from '@apollo/client';
import { resetIdCounter, useCombobox } from 'downshift';
import gql from 'graphql-tag';
import debounce from 'lodash.debounce';
import { useRouter } from 'next/dist/client/router';
import React from 'react';
import { SearchStyles, DropDown, DropDownItem } from './styles/DropDown';

const SEARCH_PRODUCTS_QUERY = gql`
  query SEARCH_PRODUCTS_QUERY($searchTerm: String!) {
    searchTerms: allProducts(
      where: {
        OR: [
          { name_contains_i: $searchTerm }
          { description_contains_i: $searchTerm }
        ]
      }
    ) {
      id
      name
      photo {
        image {
          publicUrlTransformed
        }
      }
    }
  }
`;

const Search = () => {

  const router = useRouter();

  const [findItems, { loading, data, error }] = useLazyQuery(
    SEARCH_PRODUCTS_QUERY,
    {
      fetchPolicy: 'no-cache',
    }
  );

  const items = data?.searchTerms || [];
  // Limit for request to server.
  const findItemsButChill = debounce(findItems, 350);
  resetIdCounter();

  const {
	isOpen,
    inputValue,
    getMenuProps,
    getInputProps,
    getComboboxProps,
	getItemProps
  } = useCombobox({
    items,
    onInputValueChange() {
      console.log('input changed');
      findItemsButChill({
        variables: {
          searchTerm: inputValue,
        },
      });
    },
    onSelectedItemChange({selectedItem}) {
      router.push(`/product/${selectedItem.id}`)
    },
	itemToString: item => item?.name || ''
  });

  return (
    <SearchStyles>
      <div {...getComboboxProps()}>
        <input
          type="search"
          {...getInputProps({
            type: 'search',
            placeholder: 'search for an Item',
            id: 'search',
            className: loading ? 'loading' : '',
          })}
        />
      </div>
      <DropDown {...getMenuProps()}>
        {isOpen && items.map((item) => (
          <DropDownItem key={item.id} {...getItemProps({ item })} >
            <img
              src={item.photo.image.publicUrlTransformed}
              alt={item.name}
              width="50"
            />
            {item.name}
          </DropDownItem>
        ))}
		{isOpen && !items.length && !loading && (
			<h3>Sorry! No item found.</h3>
		)}
      </DropDown>
    </SearchStyles>
  );
};

export default Search;
