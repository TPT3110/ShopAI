import React, { useState } from 'react';
import {
    View,
    Text,
    FlatList,
    Pressable,
    StyleSheet,
    SafeAreaView,
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Import tất cả các file demo
import JsxWelcomeDemo from './demos/JsxWelcomeDemo';
import PropsDemo from './demos/PropsDemo';
import StateDemo from './demos/StateDemo';
import DemoPropsState from './demos/DemoPropsState';
import StyleSheetWalkthrough from './demos/StyleSheetWalkthrough';
import ViewDemo from './demos/ViewDemo';
import TextDemo from './demos/TextDemo';
import ImageDemo from './demos/ImageDemo';
import TextInputDemo from './demos/TextInputDemo';
import ScrollDemo from './demos/ScrollDemo';
import PressableDemo from './demos/PressableDemo';
import FlatListDemo from './demos/FlatListDemo';
import SectionListDemo from './demos/SectionListDemo';
import LoadingDemo from './demos/LoadingDemo';
import ModalDemo from './demos/ModalDemo';
import SwitchDemo from './demos/SwitchDemo';
import FetchDemo from './demos/FetchDemo';
import AxiosDemo from './demos/AxiosDemo';

// Định nghĩa kiểu cho danh sách demo
type DemoItem = {
    key: string;
    title: string;
    component: React.ComponentType<any>;
};

// Danh sách các demo
const DEMO_LIST: DemoItem[] = [
    { key: 'jsx-welcome', title: '1. JSX Welcome', component: JsxWelcomeDemo },
    { key: 'props', title: '2. Props Demo', component: PropsDemo },
    { key: 'state', title: '3. State Demo', component: StateDemo },
    { key: 'props-state', title: '4. Props + State', component: DemoPropsState },
    { key: 'stylesheet', title: '5. StyleSheet Walkthrough', component: StyleSheetWalkthrough },
    { key: 'view', title: '6. View Demo', component: ViewDemo },
    { key: 'text', title: '7. Text Demo', component: TextDemo },
    { key: 'image', title: '8. Image Demo', component: ImageDemo },
    { key: 'textinput', title: '9. TextInput Demo', component: TextInputDemo },
    { key: 'scroll', title: '10. ScrollView Demo', component: ScrollDemo },
    { key: 'pressable', title: '11. Pressable Demo', component: PressableDemo },
    { key: 'flatlist', title: '12. FlatList Demo', component: FlatListDemo },
    { key: 'sectionlist', title: '13. SectionList Demo', component: SectionListDemo },
    { key: 'loading', title: '14. Loading Demo', component: LoadingDemo },
    { key: 'modal', title: '15. Modal Demo', component: ModalDemo },
    { key: 'switch', title: '16. Switch Demo', component: SwitchDemo },
    { key: 'fetch', title: '17. Fetch API', component: FetchDemo },
    { key: 'axios', title: '18. Axios API', component: AxiosDemo },
];

export default function DemoList() {
    const [selectedKey, setSelectedKey] = useState<string | null>(null);

    // Nếu đã chọn demo → hiển thị demo đó
    if (selectedKey) {
        const selected = DEMO_LIST.find(item => item.key === selectedKey);
        if (!selected) {
            setSelectedKey(null);
            return null;
        }
        const DemoComponent = selected.component;
        return (
            <SafeAreaProvider>
                <SafeAreaView style={styles.fullScreen}>
                    <View style={styles.header}>
                        <Pressable onPress={() => setSelectedKey(null)} style={styles.backButton}>
                            <Text style={styles.backText}>← Quay lại</Text>
                        </Pressable>
                        <Text style={styles.headerTitle}>{selected.title}</Text>
                    </View>
                    <View style={styles.demoContainer}>
                        <DemoComponent />
                    </View>
                </SafeAreaView>
            </SafeAreaProvider>
        );
    }

    // Mặc định: hiển thị danh sách demo
    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.fullScreen}>
                <View style={styles.listHeader}>
                    <Text style={styles.listTitle}>📱 Danh sách Demo Chương 2</Text>
                    <Text style={styles.listSub}>Chọn một demo để xem</Text>
                </View>
                <FlatList
                    data={DEMO_LIST}
                    keyExtractor={item => item.key}
                    renderItem={({ item }) => (
                        <Pressable
                            style={({ pressed }) => [
                                styles.listItem,
                                pressed && styles.listItemPressed,
                            ]}
                            onPress={() => setSelectedKey(item.key)}
                        >
                            <Text style={styles.itemTitle}>{item.title}</Text>
                            <Text style={styles.itemArrow}>→</Text>
                        </Pressable>
                    )}
                    ItemSeparatorComponent={() => <View style={styles.separator} />}
                    contentContainerStyle={styles.listContent}
                />
            </SafeAreaView>
        </SafeAreaProvider>
    );
}

// ⚠️ Định nghĩa styles (đã bị thiếu)
const styles = StyleSheet.create({
    fullScreen: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderBottomColor: '#E5E5E5',
    },
    backButton: {
        paddingVertical: 4,
        paddingRight: 12,
    },
    backText: {
        fontSize: 16,
        color: '#FF4D4F',
        fontWeight: '600',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#2C3E50',
        flex: 1,
        textAlign: 'center',
        marginRight: 48,
    },
    demoContainer: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    listHeader: {
        paddingHorizontal: 20,
        paddingVertical: 16,
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderBottomColor: '#E5E5E5',
    },
    listTitle: {
        fontSize: 22,
        fontWeight: '800',
        color: '#2C3E50',
    },
    listSub: {
        fontSize: 14,
        color: '#7F8C8D',
        marginTop: 4,
    },
    listContent: {
        paddingVertical: 8,
    },
    listItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 14,
        backgroundColor: '#FFFFFF',
        marginHorizontal: 12,
        borderRadius: 10,
    },
    listItemPressed: {
        backgroundColor: '#F0F0F0',
    },
    itemTitle: {
        fontSize: 16,
        color: '#2C3E50',
        fontWeight: '500',
    },
    itemArrow: {
        fontSize: 18,
        color: '#95A5A6',
    },
    separator: {
        height: 8,
    },
});