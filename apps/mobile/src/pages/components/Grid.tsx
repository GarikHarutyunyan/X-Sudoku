import {ReactElement, ReactNode} from 'react';
import {FlatList, StyleProp, StyleSheet, View, ViewStyle} from 'react-native';

interface IGridProps {
  items: unknown[];
  itemStyle: StyleProp<ViewStyle>;
  style?: StyleProp<ViewStyle>;
  renderItem: ({item, index}: {item: any; index: number}) => ReactElement;
  numColumns: number;
}

export const Grid = (props: IGridProps) => {
  const {items, renderItem, itemStyle, style, numColumns} = props;
  const formatItems = (dataList: unknown[], numColumns: number) => {
    const totalRows = Math.floor(dataList.length / numColumns);
    let totalLastRow = dataList.length - totalRows * numColumns;

    while (totalLastRow !== 0 && totalLastRow !== numColumns) {
      dataList.push({key: 'blank', empty: true});
      totalLastRow++;
    }

    return dataList;
  };
  const formatedItems = formatItems(items, numColumns);

  const renderFormatedItem = ({
    item,
    index,
  }: {
    item: any;
    index: number;
  }): ReactElement => {
    if (item?.empty) {
      return <View style={[itemStyle, styles.itemInvisible]} />;
    }

    return renderItem({item, index});
  };

  return (
    <FlatList
      data={formatedItems}
      renderItem={renderFormatedItem}
      numColumns={numColumns}
      style={style}
    />
  );
};

const styles = StyleSheet.create({
  itemInvisible: {
    backgroundColor: 'transparent',
  },
});
