import java.util.List;
import java.util.Arrays;
import java.util.function.Consumer;
class MyList {
	public static void main(String[] args) {
		List<String> list = Arrays.asList("A", "B", "C");
		list.forEach(e -> System.out.println(e));
		list.forEach(new Consumer<String>() {
			public void accept(String e) {
				System.out.println(e);
			}
		});
		list.forEach(System.out::println);
	}
}