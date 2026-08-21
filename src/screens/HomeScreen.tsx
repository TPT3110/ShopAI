import React, { useState, useCallback, useReducer } from "react";
import { View, StyleSheet } from "react-native";
import ShopButton from "@components/ShopButton";
import Typography from "@components/ui/Typography";
import ShopInput from "@components/ui/ShopInput";
import { useCountdown } from "@hooks/useCountdown";
import { useTheme } from "@contexts/ThemeContext";
import { SIZES } from "@constants/theme";

// useReducer cho số lượng sản phẩm
type QtyAction = { type: "ADD" } | { type: "REMOVE" };
const qtyReducer = (state: number, action: QtyAction): number => {
    switch (action.type) {
        case "ADD":
            return state + 1;
        case "REMOVE":
            return Math.max(1, state - 1);
        default:
            return state;
    }
};

const HomeScreen = () => {
    const { colors, isDark, toggleTheme } = useTheme();
    const [loading, setLoading] = useState(false);
    const [coupon, setCoupon] = useState("");
    const { timeLeft, isFinished } = useCountdown(60);
    const [quantity, dispatchQty] = useReducer(qtyReducer, 1);

    // ✅ TÍNH TỔNG TIỀN ĐỘNG
    const unitPrice = 15000000; // Giá 1 sản phẩm
    const total = unitPrice * quantity;

    const handleCheckout = useCallback(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            console.log("Thanh toán thành công!", coupon, "SL:", quantity);
        }, 2000);
    }, [coupon, quantity]);

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <Typography variant="h1" color={colors.text} style={styles.title}>
                ShopAI UI Kit
            </Typography>

            <ShopButton
                title={isDark ? "Chuyển sang Sáng" : "Chuyển sang Tối"}
                onPress={toggleTheme}
                style={{ backgroundColor: colors.primary, marginBottom: 16 }}
            />

            <Typography
                variant="body2"
                color={colors.textLight}
                style={{ textAlign: "center", marginBottom: 16 }}
            >
                {isFinished
                    ? "Đã hết hạn khuyến mãi!"
                    : `Flash sale kết thúc sau: ${timeLeft}s`}
            </Typography>

            <View style={[styles.card, { backgroundColor: colors.surface }]}>
                {/* ✅ HIỂN THỊ TỔNG TIỀN ĐỘNG */}
                <Typography variant="h2" color={colors.primary} style={styles.price}>
                    Tổng tiền: {total.toLocaleString("vi-VN")}đ
                </Typography>

                {/* Nút + / - */}
                <View style={styles.qtyRow}>
                    <ShopButton
                        title="-"
                        onPress={() => dispatchQty({ type: "REMOVE" })}
                        style={{ width: 44, height: 44 }}
                    />
                    <Typography variant="h3" color={colors.text} style={styles.qtyText}>
                        {quantity}
                    </Typography>
                    <ShopButton
                        title="+"
                        onPress={() => dispatchQty({ type: "ADD" })}
                        style={{ width: 44, height: 44 }}
                    />
                </View>

                <ShopInput
                    label="Mã giảm giá"
                    placeholder="Nhập mã (VD: SHOPAI10)"
                    value={coupon}
                    onChangeText={setCoupon}
                    autoCapitalize="characters"
                />

                <ShopButton
                    title="Xác nhận thanh toán"
                    onPress={handleCheckout}
                    isLoading={loading}
                    disabled={isFinished}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        padding: SIZES.padding,
    },
    title: { textAlign: "center", marginBottom: 12 },
    card: {
        padding: 20,
        borderRadius: SIZES.radius,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
    },
    price: { marginBottom: 20, textAlign: "center" },
    qtyRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 16,
    },
    qtyText: { marginHorizontal: 20 },
});

export default HomeScreen;