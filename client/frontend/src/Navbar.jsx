import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
// import { title } from "process";

const Navbar1 = ({
  logo = { title: "Frontend", url: "/" },
  menu = [{ title: "Home", url: "/" },
    {title: "Pricing", url: "/pricing"},
  ],
  auth = {
    login: { title: "Login", url: "/login" },
    signup: { title: "Sign up", url: "/signup" },
  },
  isLoggedIn,
  setIsLoggedIn,
  credits,        
  username,        
}) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("credits");
    localStorage.removeItem("username");
    setIsLoggedIn(false);           
    navigate("/");                   
  };

  const renderMenuItem = (item) => {
    if (item.items) {
      return (
        <NavigationMenuItem key={item.title}>
          <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
          <NavigationMenuContent className="bg-popover text-popover-foreground">
            {item.items.map((sub) => (
              <NavigationMenuLink asChild key={sub.title} className="w-80">
                <a
                  href={sub.url}
                  className="flex gap-4 rounded-md p-3 hover:bg-muted"
                >
                  <div>{sub.icon}</div>
                  <div>
                    <div className="font-semibold">{sub.title}</div>
                    {sub.description && (
                      <p className="text-sm text-muted-foreground">
                        {sub.description}
                      </p>
                    )}
                  </div>
                </a>
              </NavigationMenuLink>
            ))}
          </NavigationMenuContent>
        </NavigationMenuItem>
      );
    }
    return (
      <NavigationMenuItem key={item.title}>
        <NavigationMenuLink
          href={item.url}
          className="inline-flex h-10 items-center justify-center rounded-md px-4 py-2 text-sm font-medium hover:bg-muted"
        >
          {item.title}
        </NavigationMenuLink>
      </NavigationMenuItem>
    );
  };

  return (
    <section className="container mx-auto px-4 py-4">  {/* ⬅️ CHANGED: unified CSS */}
      <nav className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          <a href={logo.url} className="flex items-center gap-2">
            {logo.src && (
              <img src={logo.src} alt={logo.alt} className="max-h-8" />
            )}
            <span className="text-lg font-semibold">
              {logo.title}
            </span>
          </a>
          <NavigationMenu>
            <NavigationMenuList>
              {menu.map(renderMenuItem)}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <div className="flex items-center gap-2">
          {isLoggedIn ? (
            <>
              <Button asChild size="sm">
                <span>
                  {username && `${username} • `}Credits: {credits}  {/* ⬅️ CHANGED: show username & credits */}
                </span>
              </Button>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button asChild variant="outline" size="sm">
                <a href={auth.login.url}>{auth.login.title}</a>
              </Button>
              <Button asChild size="sm">
                <a href={auth.signup.url}>{auth.signup.title}</a>
              </Button>
            </>
          )}
        </div>
      </nav>
    </section>
  );
};

export { Navbar1 };
