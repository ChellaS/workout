package miniducksimulator;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
//import miniducksimulator;
/**
 *
 * @author Chella
 */
public class MallardDuck extends Duck{
    public MallardDuck() {
        quackBehavior = new Quack();
        flyBehavior = new FlyWithWings();
    }
    
    public void display() {
        System.out.println("I'm a real Mallard Duck!");
    }
}

