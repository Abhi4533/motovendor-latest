import React, { useState, useMemo, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
  TextInput,
  TouchableWithoutFeedback,
  SafeAreaView,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

type Option = {
  label: string;
  value: string;
};

type Props = {
  /** Label displayed above the dropdown */
  label?: string;
  /** Array of options */
  data: Option[];
  /** Currently selected value */
  value?: string;
  /** Placeholder text when no option is selected */
  placeholder?: string;
  /** Callback when an option is selected */
  onSelect: (item: Option) => void;
  /** If true, adds a search input to filter options */
  searchable?: boolean;
  /** Disables the dropdown */
  disabled?: boolean;
  /** If true, shows error state (red border) */
  error?: boolean;
  /** Error message to display below the dropdown */
  errorText?: string;
  /** Custom styles for the container view */
  style?: StyleProp<ViewStyle>;
  /** Custom styles for the dropdown button */
  dropdownStyle?: StyleProp<ViewStyle>;
  /** Custom styles for the modal content */
  modalStyle?: StyleProp<ViewStyle>;
  /** Custom styles for each option item */
  itemStyle?: StyleProp<ViewStyle>;
  /** Custom text styles for option labels */
  itemTextStyle?: StyleProp<TextStyle>;
};

export default function CustomDropdown({
  label,
  data,
  value,
  placeholder = 'Select option',
  onSelect,
  searchable = false,
  disabled = false,
  error = false,
  errorText,
  style,
  dropdownStyle,
  modalStyle,
  itemStyle,
  itemTextStyle,
}: Props) {
  const [visible, setVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Memoize the selected item to avoid re‑calculation on every render
  const selectedItem = useMemo(
    () => data.find(item => item.value === value),
    [data, value],
  );

  // Filter options based on search query (case‑insensitive)
  const filteredData = useMemo(() => {
    if (!searchQuery) return data;
    return data.filter(item =>
      item.label.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [data, searchQuery]);

  const handleSelect = useCallback(
    (item: Option) => {
      onSelect(item);
      setVisible(false);
      setSearchQuery(''); // Reset search when closing
    },
    [onSelect],
  );

  const handleClose = useCallback(() => {
    setVisible(false);
    setSearchQuery('');
  }, []);

  const renderItem = useCallback(
    ({ item }: { item: Option }) => (
      <TouchableOpacity
        style={[styles.item, itemStyle]}
        onPress={() => handleSelect(item)}
        accessibilityRole="button"
        accessibilityLabel={`Select ${item.label}`}
      >
        <Text style={[styles.itemText, itemTextStyle]}>{item.label}</Text>
        {item.value === value && (
          <MaterialIcons name="check" size={20} color="#007AFF" />
        )}
      </TouchableOpacity>
    ),
    [handleSelect, value, itemStyle, itemTextStyle],
  );

  const keyExtractor = useCallback((item: Option) => item.value, []);

  return (
    <View style={[styles.container, style]}>
      {label && <Text style={styles.label}>{label}</Text>}

      <TouchableOpacity
        style={[
          styles.dropdown,
          dropdownStyle,
          disabled && styles.dropdownDisabled,
          error && styles.dropdownError,
        ]}
        onPress={() => !disabled && setVisible(true)}
        disabled={disabled}
        activeOpacity={disabled ? 1 : 0.7}
        accessibilityRole="button"
        accessibilityLabel={label ? `${label} dropdown` : 'dropdown'}
        accessibilityHint="Tap to select an option"
      >
        <Text
          style={[
            styles.text,
            !selectedItem && styles.placeholder,
            disabled && styles.textDisabled,
          ]}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {selectedItem ? selectedItem.label : placeholder}
        </Text>
        <MaterialIcons
          name={visible ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
          size={24}
          color={disabled ? '#ccc' : '#777'}
        />
      </TouchableOpacity>

      {error && errorText && <Text style={styles.errorText}>{errorText}</Text>}

      <Modal
        visible={visible}
        transparent
        animationType="slide"
        onRequestClose={handleClose}
      >
        <TouchableWithoutFeedback onPress={handleClose}>
          <View style={styles.overlay}>
            {/* This empty view captures taps outside the modal content */}
          </View>
        </TouchableWithoutFeedback>

        <SafeAreaView style={[styles.modalContainer, modalStyle]}>
          {/* Header with title and close button */}
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>{label || 'Select option'}</Text>
            <TouchableOpacity
              onPress={handleClose}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <MaterialIcons name="close" size={24} color="#777" />
            </TouchableOpacity>
          </View>

          {/* Search input (optional) */}
          {searchable && (
            <View style={styles.searchContainer}>
              <MaterialIcons
                name="search"
                size={20}
                color="#ccc"
                style={styles.searchIcon}
              />
              <TextInput
                style={styles.searchInput}
                placeholder="Search..."
                value={searchQuery}
                onChangeText={setSearchQuery}
                autoCapitalize="none"
                autoCorrect={false}
                clearButtonMode="while-editing"
              />
            </View>
          )}

          {/* Options list */}
          <FlatList
            data={filteredData}
            keyExtractor={keyExtractor}
            renderItem={renderItem}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContent}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No options available</Text>
              </View>
            }
          />
        </SafeAreaView>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  label: {
    marginBottom: 6,
    fontWeight: '600',
    fontSize: 14,
    color: '#333',
  },
  dropdown: {
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
  },
  dropdownDisabled: {
    backgroundColor: '#f5f5f5',
    borderColor: '#ddd',
  },
  dropdownError: {
    borderColor: '#ff3b30',
  },
  text: {
    fontSize: 16,
    color: '#000',
    flex: 1,
  },
  placeholder: {
    color: '#aaa',
  },
  textDisabled: {
    color: '#aaa',
  },
  errorText: {
    color: '#ff3b30',
    fontSize: 12,
    marginTop: 4,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    maxHeight: '80%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: '#333',
    paddingVertical: 0,
  },
  listContent: {
    paddingVertical: 8,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  },
  itemText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  emptyContainer: {
    padding: 20,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 14,
    color: '#aaa',
  },
});
