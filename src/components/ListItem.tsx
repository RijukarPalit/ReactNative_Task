import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
//import type { ItemType } from '../../App';

// export type ItemType = {
//   id: string;
//   name: string;
//   //description: string;
//   age :string;
//   gender : string;
// };
export interface ItemType {
   id: string;
  name: string;
  age :number;
  gender : string;
  mobile : number;
}
type Props = {
  item: ItemType;
  onEdit: () => void;
};

export default function ListItem({ item, onEdit }: Props) {
  return (
    <View style={styles.row}>
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{item.name}</Text>
         <Text style={styles.title}>{item.mobile}</Text>
        <Text style={styles.description}>{item.age}</Text>
        <Text style={styles.description}>{item.gender}</Text>
      </View>
      <TouchableOpacity onPress={onEdit} style={styles.editButton}>
        {/* <Edit size={20} color="#1976d2" /> */}
        <Text style={{ color: '#1976d2' }}>Edit</Text>  
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    borderBottomWidth: 1,
    borderColor: '#eee',
    paddingBottom: 8,
  },
  title: { fontSize: 16, fontWeight: '600' },
  description: { fontSize: 14, color: '#555' },
  editButton: { padding: 8 },
});