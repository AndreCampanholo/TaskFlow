// export default function TarefaEditar() {
//     <Pressable
//       style={[styles.overlay, { paddingTop: insets.top + 16, paddingBottom: insets.bottom + 16 }]}
//       onPress={() => router.back()}
//     >
//       <Pressable style={styles.card} onPress={() => null}>

//         <Text style={styles.title}>Detalhes da Tarefa</Text>

//         <Text style={styles.description}>
//           Esta ação é irreversível. Todos os seus dados, tarefas e histórico
//           serão permanentemente removidos. Para prosseguir, confirme sua senha.
//         </Text>

//         <Text style={styles.label}>Senha de confirmação</Text>
//         <TextInput
//           value={password}
//           onChangeText={setPassword}
//           placeholder="Digite sua senha"
//           secureTextEntry
//           style={styles.input}
//         />

//         <View style={styles.actions}>

//           <BotaoAzulEscuro text="Editar Tarefa" action={() => router.push()}

//           <BotaoCancelar text="Cancelar" action={() => router.back()} />
//         </View>
//       </Pressable>
//     </Pressable>
// }
