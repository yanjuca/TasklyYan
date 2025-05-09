import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
} from 'react-native';

interface FilterModalProps {
  visible: boolean;
  onClose: () => void;
  onFilter: (filters: any) => void;
}

interface Filters {
  sortByPriority?: 'high' | 'low';
  tags?: string[];
}

const FilterModal: React.FC<FilterModalProps> = ({ visible, onClose, onFilter }) => {
  const [expandSortOptions, setExpandSortOptions] = useState<boolean>(false);
  const [expandTagsOptions, setExpandTagsOptions] = useState<boolean>(false);
  const [expandDateOptions, setExpandDateOptions] = useState<boolean>(false);
  const [prioritySortOrder, setPrioritySortOrder] = useState<'high' | 'low' | ''>('');
  const [availableTags, setAvailableTags] = useState([
    { id: 'trabalho', label: 'TRABALHO' },
    { id: 'casa', label: 'CASA' },
    { id: 'academia', label: 'ACADEMIA' },
  ]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [dateFilterText, setDateFilterText] = useState<string>('');

  const handleApplyFilters = () => {
    const filters: Filters = {};
    if (prioritySortOrder) {
      filters.sortByPriority = prioritySortOrder;
    }
    if (selectedTags.length > 0) {
      filters.tags = selectedTags;
    }
    onFilter(filters);
    onClose();
  };

  const handleClearFilters = () => {
    setExpandSortOptions(false);
    setExpandTagsOptions(false);
    setPrioritySortOrder('');
    setSelectedTags([]);
    onFilter({});
    onClose();
  };

  const togglePriority = (priority: 'high' | 'low') => {
    setPrioritySortOrder(prioritySortOrder === priority ? '' : priority);
  };

  const toggleTag = (tagId: string) => {
    if (selectedTags.includes(tagId)) {
      setSelectedTags(selectedTags.filter((id) => id !== tagId));
    } else {
      setSelectedTags([...selectedTags, tagId]);
    }
  };

  // Lógica para dividir as tags em colunas
  const column1 = availableTags.slice(0, Math.min(2, availableTags.length));
  const remainingTags = availableTags.slice(2);
  const column2 = remainingTags;

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <View style={styles.header}>
            <Text style={styles.title}>Filtro</Text>
            <TouchableOpacity onPress={onClose}>
              <Image source={require('../../assets/icons/Close.png')} style={styles.closeIcon} resizeMode="center" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.filterItem} onPress={() => setExpandSortOptions(!expandSortOptions)}>
            <Text style={styles.filterLabel}>Ordenar por</Text>
            <Image source={expandSortOptions ? require('../../assets/icons/ChevronUp.png') : require('../../assets/icons/ChevronDown.png')} style={styles.arrowIcon} resizeMode="contain" />
          </TouchableOpacity>
          {expandSortOptions && (
            <View style={styles.filterOptions}>
              <TouchableOpacity
                onPress={() => togglePriority('high')}
                style={[styles.priorityOption]}
              >
                <View style={[styles.roundCheckbox, prioritySortOrder === 'high' ? styles.roundCheckboxChecked : styles.roundCheckboxUnchecked]}>
                  {prioritySortOrder === 'high' && <Text style={styles.checkmark}>✓</Text>}
                </View>
                <Text style={styles.checkboxLabel}>Prioridade (de baixa para alta)</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => togglePriority('low')}
                style={[styles.priorityOption]}
              >
                <View style={[styles.roundCheckbox, prioritySortOrder === 'low' ? styles.roundCheckboxChecked : styles.roundCheckboxUnchecked]}>
                  {prioritySortOrder === 'low' && <Text style={styles.checkmark}>✓</Text>}
                </View>
                <Text style={styles.checkboxLabel}>Prioridade (de alta para baixa)</Text>
              </TouchableOpacity>
            </View>
          )}

          <TouchableOpacity style={styles.filterItem} onPress={() => setExpandTagsOptions(!expandTagsOptions)}>
            <Text style={styles.filterLabel}>Tags</Text>
            <Image source={expandTagsOptions ? require('../../assets/icons/ChevronUp.png') : require('../../assets/icons/ChevronDown.png')} style={styles.arrowIcon} resizeMode="contain" />
          </TouchableOpacity>
          {expandTagsOptions && (
            <View style={styles.filterOptions}>
              <View style={styles.tagsColumnsContainer}>
                <View style={styles.tagColumn}>
                  {column1.map((tag) => (
                    <View style={styles.checkboxContainer} key={tag.id}>
                      <TouchableOpacity
                        style={[
                          styles.tagSquircleCheckbox,
                          selectedTags.includes(tag.id) && styles.tagSquircleCheckboxChecked,
                        ]}
                        onPress={() => toggleTag(tag.id)}
                      >
                        {selectedTags.includes(tag.id) && <Text style={styles.checkmarkTags}>✓</Text>}
                      </TouchableOpacity>
                      <Text style={styles.checkboxLabel}>{tag.label}</Text>
                    </View>
                  ))}
                </View>
                <View style={styles.tagColumn}>
                  {column2.map((tag) => (
                    <View style={styles.checkboxContainer} key={tag.id}>
                      <TouchableOpacity
                        style={[
                          styles.tagSquircleCheckbox,
                          selectedTags.includes(tag.id) && styles.tagSquircleCheckboxChecked,
                        ]}
                        onPress={() => toggleTag(tag.id)}
                      >
                        {selectedTags.includes(tag.id) && <Text style={styles.checkmarkTags}>✓</Text>}
                      </TouchableOpacity>
                      <Text style={styles.checkboxLabel}>{tag.label}</Text>
                    </View>
                  ))}
                </View>
              </View>
            </View>
          )}

          <TouchableOpacity style={styles.filterItem} onPress={() => setExpandDateOptions(!expandDateOptions)}>
            <Text style={styles.filterLabel}>Data</Text>
            <Image
              source={expandDateOptions ? require('../../assets/icons/ChevronUp.png') : require('../../assets/icons/ChevronDown.png')}
              style={styles.arrowIcon}
              resizeMode="contain"
            />
          </TouchableOpacity>
          {expandDateOptions && (
            <View style={styles.dateField}>
              <TextInput
                value={dateFilterText}
                onChangeText={setDateFilterText}
                style={styles.dateInput}
                placeholder="example@example.com"
              />
            </View>
          )}

          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.buttonPrimary} onPress={handleApplyFilters}>
              <Text style={styles.primaryText}>APLICAR</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonPrimary} onPress={handleClearFilters}>
              <Text style={styles.primaryText}>LIMPAR FILTROS</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(17, 24, 39, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: '#f4f4f4',
    borderRadius: 8,
    paddingHorizontal: 25,
    paddingVertical: 20,
    width: '85%',
    maxWidth: 400,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Roboto-Bold',
    color: '#212121',
  },
  closeIcon: {
    width: 25,
    height: 25,
    marginTop: 5,
    marginRight: 3,
  },
  filterItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderColor: '#e0e0e0',
  },
  filterLabel: {
    fontSize: 18,
    fontFamily: 'Roboto-Medium',
    color: 'black',
  },
  arrowIcon: {
    width: 18,
    height: 18,
    marginTop: 0,
    marginRight: 5,
  },
  filterOptions: {
    paddingLeft: 15,
    marginTop: 0,
    marginBottom: 20,
    backgroundColor: '#E6E0F7',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 1.5,
    borderColor: '#32C25B',
    borderRadius: 4,
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#32C25B',
  },
  checkmark: {
    color: '#fff',
    fontSize: 12,
  },
  checkmarkTags: {
    color: '#32C25B',
    fontSize: 12,
  },
  checkboxLabel: {
    fontSize: 16,
    fontFamily: 'Roboto-Regular',
    color: '#1E1E1E',
  },
  buttonRow: {
    flexDirection: 'column',
    marginTop: 50,
  },
  buttonPrimary: {
    backgroundColor: '#5B3CC4',
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  dateField: {
    borderWidth: 2,
    borderRadius: 8,
    borderColor: "#5B3CC4",
    backgroundColor: '#FFF'
  },
  dateInput: {
    marginLeft: 10,
  },
  primaryText: {
    color: '#fff',
    fontFamily: 'Roboto-Medium',
    fontSize: 18,
  },
  priorityOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingLeft: 0,
    borderRadius: 0,
    marginBottom: 0,
  },
  roundCheckbox: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#B58B46',
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  roundCheckboxChecked: {
    backgroundColor: '#32C25B',
    borderColor: '#32C25B',
  },
  roundCheckboxUnchecked: {},
  tagSquircleCheckbox: {
    width: 20,
    height: 20,
    borderRadius: 0,
    borderWidth: 1.5,
    borderColor: '#B58B46',
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tagSquircleCheckboxChecked: {
    backgroundColor: '#E6E0F7',
    borderColor: '#32C25B',
  },
  tagsColumnsContainer: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tagColumn: {
    flex: 1,
  },
});

export default FilterModal;